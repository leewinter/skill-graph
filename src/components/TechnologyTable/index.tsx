import {
  ConfirmDialog,
  ConfirmationCallback,
  defaultConfirmCallback,
} from "@src/components/ConfirmDialog";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TechnologyRow, getDefaultRow } from "./table-types";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@src/components/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditRowDialog from "./EditRowDialog";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { useAvailableCategories } from "@src/hooks/useAvailableCategories";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
  const [currentRow, setCurrentRow] = useState<TechnologyRow | null>(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const categories = useAvailableCategories();

  const { t, ready } = useTranslation();

  if (!ready) return <div>{t("shared.loading")}</div>;

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
          return { ...currentRow, newRow: false };
        }
        return row;
      });
      handleDataChanged(updatedData);
      setDialogOpen(false);
    } else {
      // Show Snackbar if duplicate
      setSnackbarMessage(t("technologyTable.notifications.duplicateTech"));
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
      message: t("technologyTable.confirmationMessage.deleteRow"),
    });
  };

  const handleEditClose = () => {
    setDialogOpen(false);
    if (currentRow?.newRow) handleDeleteRow(currentRow.id);
  };

  const columns: GridColDef[] = [
    { field: "technology", headerName: t("technologyTable.technologyGrid.columns.technology"), flex: 1 },
    {
      field: "ability",
      headerName: t("technologyTable.technologyGrid.columns.ability"),
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
      headerName: t("technologyTable.technologyGrid.columns.category"),
      flex: 1,
      renderCell: (params) => (
        <span>
          {Array.isArray(params.value) ? params.value.map(c=> categories.find(n=>n.value === c)?.label).join(", ") : ""}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: t("technologyTable.technologyGrid.columns.actions"),
      flex: 0.5,
      renderCell: (params) => (
        <Box>
          <Tooltip title={t("technologyTable.technologyGrid.actions.edit")}>
            <IconButton
              onClick={() => handleRowEditClick(params.row as TechnologyRow)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("technologyTable.technologyGrid.actions.delete")}>
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
          text={t("technologyTable.addRowBtnLabel")}
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
        saveRow={saveRow}
      />
    </Box>
  );
}
