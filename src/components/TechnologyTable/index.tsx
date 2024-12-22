import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@src/components/Button";
import {
  ConfirmationCallback,
  ConfirmDialog,
  defaultConfirmCallback,
} from "@src/components/ConfirmDialog";
import { useState } from "react";

import EditRowDialog from "./EditRowDialog";
import { getDefaultRow, TechnologyRow } from "./table-types";

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

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const columns: GridColDef[] = [
    { field: "technology", headerName: "Technology", flex: 1 },
    {
      field: "ability",
      headerName: "Ability",
      flex: 0.5,
      renderCell: (params) => (
        <span>
          {"★".repeat(params.value)}{" "}
          <span style={{ opacity: 0.3 }}>{"★".repeat(10 - params.value)}</span>
        </span>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valueGetter: (params: any) =>
        Array.isArray(params.value) ? params.row.category.join(", ") : "",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleRowEditClick(params.row as TechnologyRow)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleRowDeleteClick(params.row as TechnologyRow)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <DataGrid rows={data} columns={columns} getRowId={(row) => row.id} />
      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
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
        autoHideDuration={4000}
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
    </Box>
  );
}
