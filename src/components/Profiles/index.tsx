import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InsightsIcon from "@mui/icons-material/Insights";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@src/components/Button";
import {
  ConfirmationCallback,
  ConfirmDialog,
  defaultConfirmCallback,
} from "@src/components/ConfirmDialog";
import { InfoDialog } from "@src/components/InfoDialog/Index";
import { PROFILES_DATA_KEY } from "@src/constants";
import { base64AsData, dataAsBase64 } from "@src/utils/base64";
import { copyToClipboard } from "@src/utils/clipboard";
import localforage from "localforage";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import EditRowDialog from "./EditRowDialog";
import { getDefaultRow, ProfileRow } from "./profile-table-types";

const initData: ProfileRow[] = [];

export default function ProfilesTable() {
  const [data, setData] = useState<ProfileRow[]>(initData);
  const [importDataOpen, setImportDataOpen] = useState<ConfirmationCallback>(
    defaultConfirmCallback
  );
  const [deleteRowOpen, setDeleteRowOpen] = useState<ConfirmationCallback>(
    defaultConfirmCallback
  );
  const [dataUrlOpen, setDataUrlOpen] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<ProfileRow | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getDataFromPersistentStore = async (): Promise<ProfileRow[] | null> => {
    const value = await localforage.getItem<ProfileRow[]>(PROFILES_DATA_KEY);
    return value;
  };

  useEffect(() => {
    const initialiseData = async () => {
      if (searchParams.has("data")) {
        const base64Data = searchParams.get("data");
        let confirmationMessage = "";
        let confirmationCallback = () => {};
        if (base64Data) {
          const jsonData = base64AsData<ProfileRow>(base64Data);
          if (jsonData) {
            const dataFromStore = await getDataFromPersistentStore();
            const alreadyExistingProfile = dataFromStore?.find(
              (n) => n.id === jsonData.id
            );
            if (alreadyExistingProfile) {
              confirmationMessage = `Profile already exists for ${jsonData.name}, would you like to update?`;
              confirmationCallback = () => {
                if (dataFromStore) {
                  const updatedRows = dataFromStore.map((row) => {
                    if (row.id === jsonData.id) {
                      return jsonData;
                    }
                    return row;
                  });
                  handleDataChanged(updatedRows);
                }
              };
            } else {
              confirmationMessage = `Profile does not currently exist for ${jsonData.name}, would you like to import?`;
              confirmationCallback = () => {
                handleDataChanged([...(dataFromStore || []), jsonData]);
              };
            }
          }
        }
        const confirmation = {
          open: true,
          callback: (confirmResult: boolean) => {
            if (confirmResult) {
              confirmationCallback();
            }
            setImportDataOpen(defaultConfirmCallback);
          },
          message: confirmationMessage,
        };
        setImportDataOpen(confirmation);
      } else {
        const d = await getDataFromPersistentStore();
        if (d) setData(d as ProfileRow[]);
      }
    };

    initialiseData();
  }, [searchParams]);

  const handleDataChanged = (updatedData: ProfileRow[]) => {
    setData(updatedData);
    localforage.setItem(PROFILES_DATA_KEY, updatedData, (err) => {
      if (err) throw err;
    });
  };

  const handleDeleteRow = (id: string) => {
    const filteredData = data.filter((item) => item.id !== id);
    handleDataChanged(filteredData);
  };

  const handleDataUrlToClipboard = (row: ProfileRow) => {
    const base64Data = dataAsBase64<ProfileRow>(row);
    const dataUrl = `${window.location.href.replace(
      window.location.search,
      ""
    )}?data=${base64Data}`;
    copyToClipboard(dataUrl);
    setDataUrlOpen(dataUrl);
  };

  const handleRowEditClick = (row: ProfileRow) => {
    setCurrentRow(row);
    setDialogOpen(true);
  };

  const handleRowGraphClick = (row: ProfileRow) => {
    const queryParams = new URLSearchParams({
      "profile-id": row.id,
    }).toString();
    navigate(`/graph?${queryParams}`);
  };

  const handleRowDeleteClick = (row: ProfileRow) => {
    setDeleteRowOpen({
      open: true,
      callback: (confirmResult: boolean) => {
        if (confirmResult) handleDeleteRow(row.id);
        setDeleteRowOpen(defaultConfirmCallback);
      },
      message: "Remove this row?",
    });
  };

  const handleRowSave = () => {
    if (currentRow) {
      const updatedData = data.map((row) => {
        if (row.id === currentRow.id) {
          return { ...currentRow, newRow: false };
        }
        return row;
      });
      handleDataChanged(updatedData);
    }
    setDialogOpen(false);
  };

  const handleEditClose = () => {
    setDialogOpen(false);
    if (currentRow?.newRow) handleDeleteRow(currentRow.id);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleRowEditClick(params.row as ProfileRow)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Graph">
            <IconButton
              onClick={() => handleRowGraphClick(params.row as ProfileRow)}
            >
              <InsightsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy URL">
            <IconButton
              onClick={() => handleDataUrlToClipboard(params.row as ProfileRow)}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleRowDeleteClick(params.row as ProfileRow)}
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
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        <Button
          onClick={() => {
            const newRow = getDefaultRow();
            handleDataChanged([...data, { ...newRow }]);
            handleRowEditClick(newRow);
          }}
          text="Add Row"
        />
      </Stack>
      <ConfirmDialog
        id="import-data-confirmation"
        keepMounted
        onClose={importDataOpen.callback}
        open={importDataOpen.open}
        message={importDataOpen.message}
      />
      <ConfirmDialog
        id="delete-row-confirmation"
        keepMounted
        onClose={deleteRowOpen.callback}
        open={deleteRowOpen.open}
        message={deleteRowOpen.message}
      />
      <InfoDialog
        id="data-url-confirmation"
        keepMounted
        onClose={() => setDataUrlOpen(null)}
        open={Boolean(dataUrlOpen)}
        message="Share your profile"
        url={dataUrlOpen}
      />
      <EditRowDialog
        open={dialogOpen}
        onClose={handleEditClose}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        saveRow={handleRowSave}
      />
    </Box>
  );
}
