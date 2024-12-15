import {
  ConfirmDialog,
  ConfirmationCallback,
  defaultConfirmCallback,
} from "@src/components/ConfirmDialog";
import { ProfileRow, getDefaultRow } from "./profile-table-types";
import React, { useEffect, useState } from "react";
import { base64AsData, dataAsBase64 } from "@src/utils/base64";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "@src/components/Button";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditRowDialog from "./EditRowDialog";
import IconButton from "@mui/material/IconButton";
import { InfoDialog } from "@src/components/InfoDialog/Index";
import InsightsIcon from '@mui/icons-material/Insights';
import { PROFILES_DATA_KEY } from "@src/constants";
import { ReactTabulator } from "react-tabulator";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { copyToClipboard } from "@src/utils/clipboard";
import { createRoot } from "react-dom/client";
import localforage from "localforage";
import { useTabulatorModernStyles } from "../Table/use-tabulator-modern-styles";

const initData: ProfileRow[] = [];

const createActionsFormatter = (handlers: {
  onEdit: (rowData: ProfileRow) => void;
  onGraph: (rowData: ProfileRow) => void;
  onCopy: (rowData: ProfileRow) => void;
  onDelete: (rowData: ProfileRow) => void;
}) => {
  return (cell: any) => {
    const container = document.createElement("div");
    const root = createRoot(container);

    const row = cell.getRow();
    const rowData = row.getData() as ProfileRow;

    root.render(
      <React.Fragment>
        <Tooltip title={`Edit row for ${rowData.name}`} arrow placement="left">
          <IconButton onClick={() => handlers.onEdit(rowData)} aria-label="edit" size="small" color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <IconButton onClick={() => handlers.onGraph(rowData)} aria-label="graph" size="small" color="secondary" title={`Show graphs for ${rowData.name}`}>
          <InsightsIcon />
        </IconButton>
        <Tooltip title={`Copy data URL for ${rowData.name}`} arrow placement="left">
          <IconButton onClick={() => handlers.onCopy(rowData)} aria-label="copy data url" size="small" >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={`Delete profile for ${rowData.name}`} arrow placement="left">
          <IconButton onClick={() => handlers.onDelete(rowData)} aria-label="delete" size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );

    return container;
  };
};

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

  const styles = useTabulatorModernStyles();
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
        let confirmationCallback = () => { };
        if (base64Data) {
          const jsonData = base64AsData<ProfileRow>(base64Data);
          if (jsonData) {
            const dataFromStore = await getDataFromPersistentStore();
            const alreadyExistingProfile = dataFromStore?.find(
              (n) => n.name === jsonData.name
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
              confirmationMessage = `Profile does not currently exists for ${jsonData.name}, would you like to import?`;
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
  }

  const handleRowDeleteClick = (row: ProfileRow) => {
    setDeleteRowOpen({
      open: true,
      callback: (confirmResult: boolean) => {
        if (confirmResult)
          handleDeleteRow(row.id);
        setDeleteRowOpen(defaultConfirmCallback);
      },
      message: "Remove this row?",
    })
  }

  const saveRow = () => {
    if (currentRow) {
      const updatedData = data.map((row) => {
        if (row.id === currentRow.id) {
          return { ...currentRow };
        }
        return row;
      });
      handleDataChanged(updatedData);
    }
    setDialogOpen(false);
  };

  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

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
                onGraph: handleRowGraphClick,
                onCopy: handleDataUrlToClipboard,
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
            handleDataChanged([...data, { ...newRow }])
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
        message="Url copied to the clipboard"
        url={dataUrlOpen}
      />
      <EditRowDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        saveRow={saveRow}
      />
    </div>
  );
}
