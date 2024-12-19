import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Button from "@src/components/Button";
import {
  ConfirmationCallback,
  ConfirmDialog,
  defaultConfirmCallback,
} from "@src/components/ConfirmDialog";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ReactTabulator } from "react-tabulator";
import { CellComponent } from "tabulator-tables";

import EditRowDialog from "./EditRowDialog";
import { getDefaultRow, TechnologyRow } from "./table-types";
import { useTabulatorModernStyles } from "./use-tabulator-modern-styles";

const createActionsFormatter = (handlers: {
  onEdit: (rowData: TechnologyRow) => void;
  onDelete: (rowData: TechnologyRow) => void;
}) => {
  return (cell: CellComponent) => {
    const container = document.createElement("div");
    const root = createRoot(container);

    const row = cell.getRow();
    const rowData = row.getData() as TechnologyRow;

    root.render(
      <React.Fragment>
        <Tooltip
          title={`Edit row for ${rowData.technology}`}
          arrow
          placement="left"
        >
          <IconButton
            onClick={() => handlers.onEdit(rowData)}
            aria-label="edit"
            size="small"
            color="primary"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={`Delete profile for ${rowData.technology}`}
          arrow
          placement="left"
        >
          <IconButton
            onClick={() => handlers.onDelete(rowData)}
            aria-label="delete"
            size="small"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );

    return container;
  };
};

export default function TechnologyTable({
  initData,
  onDataChange,
}: {
  initData: TechnologyRow[];
  onDataChange: (technologies: TechnologyRow[]) => void;
}) {
  const [data, setData] = useState<TechnologyRow[]>(initData);
  const [deleteRowOpen, setDeleteRowOpen] = useState<ConfirmationCallback>(
    defaultConfirmCallback
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState<TechnologyRow | null>(null);

  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const styles = useTabulatorModernStyles();

  const handleDataChanged = (updatedData: TechnologyRow[]) => {
    const uniqueCategories = updatedData.map((item) => ({
      ...item,
      category: [...new Set(item.category)],
    }));
    setData(uniqueCategories);
    if (onDataChange) onDataChange(uniqueCategories);
  };

  const handleDeleteRow = (id: string) => {
    const filteredData = data.filter((item) => item.id !== id);
    handleDataChanged(filteredData);
  };

  const handleRowClick = (rowData: TechnologyRow) => {
    setCurrentRow(rowData);
    setSelectedCategories(rowData.category || []);
    setDialogOpen(true);
  };

  const saveRow = () => {
    if (!currentRow) return;

    // Validate duplicate technology name
    const technologyAlreadyExists = data.find(
      (n) => n.technology === currentRow?.technology && n.id !== currentRow.id
    );

    if (!technologyAlreadyExists) {
      const updatedData = data.map((row) => {
        if (row.id === currentRow.id) {
          return { ...currentRow, category: selectedCategories };
        }
        return row;
      });
      handleDataChanged(updatedData);
      setDialogOpen(false);
    } else {
      // Show Snackbar if duplicate
      setSnackbarMessage("Duplicate technology detected!");
      setSnackbarOpen(true);
    }
  };

  const handleRowEditClick = (row: TechnologyRow) => {
    setCurrentRow(row);
    setDialogOpen(true);
  };

  const handleRowDeleteClick = (row: TechnologyRow) => {
    setDeleteRowOpen({
      open: true,
      callback: (confirmResult: boolean) => {
        if (confirmResult) handleDeleteRow(row.id);
        setDeleteRowOpen(defaultConfirmCallback);
      },
      message: "Remove this row?",
    });
  };

  const handleEditClose = () => {
    setDialogOpen(false);
    if (currentRow?.newRow) handleDeleteRow(currentRow.id);
  };

  const columns = [
    {
      title: "Technology",
      field: "technology",
      editor: "input",
      validator: ["required", "unique"],
    },
    {
      title: "Ability",
      field: "ability",
      hozAlign: "center",
      formatter: "star",
      formatterParams: {
        stars: 10,
      },
    },
    {
      title: "Category",
      field: "category",
      sorter: (a: string[], b: string[]) => {
        const aString = a.join(", ");
        const bString = b.join(", ");
        return aString.localeCompare(bString);
      },
      formatter: (cell: CellComponent) => cell.getValue().join(", "),
    },
  ];

  if (!data) return null;

  return (
    <div css={styles}>
      <ReactTabulator
        data={data}
        options={{
          movableColumns: true,
          columns: [
            ...columns,
            {
              title: "Actions",
              field: "actions",
              hozAlign: "center",
              width: 150,
              formatter: createActionsFormatter({
                onEdit: handleRowEditClick,
                onDelete: handleRowDeleteClick,
              }),
            },
          ],
          theme: "Midnight",
        }}
      />
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => {
            const newRow = getDefaultRow();
            handleDataChanged([...data, { ...newRow }]);
            handleRowClick(newRow);
          }}
          text="Add Row"
        />
      </Stack>

      {/* Snackbar for duplicate technology warning */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Auto-hide after 4 seconds
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <ConfirmDialog
        id="delete-row-confirmation"
        keepMounted
        onClose={deleteRowOpen.callback}
        open={deleteRowOpen.open}
        message={deleteRowOpen.message}
      />
      <EditRowDialog
        open={dialogOpen}
        onClose={handleEditClose}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        saveRow={saveRow}
      />
    </div>
  );
}
