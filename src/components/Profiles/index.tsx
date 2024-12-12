import Stack from "@mui/material/Stack";
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
import { useSearchParams } from "react-router-dom";
import { ReactTabulator } from "react-tabulator";
import { CellComponent } from "tabulator-tables";

import { useTabulatorModernStyles } from "../Table/use-tabulator-modern-styles";
import EditRowDialog from "./EditRowDialog";
import { getDefaultRow, ProfileRow } from "./profile-table-types";

const DeleteButton = () => "<button class='delete-btn'>X</button>";
const CopyUrlButton = () => "<button class='copy-btn'>⎘</button>";

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
        let confirmationCallback = () => {};
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

  const handleRowClick = (_e: PointerEvent, row: CellComponent) => {
    const rowData = row.getData() as ProfileRow;
    setCurrentRow(rowData);
    setDialogOpen(true);
  };

  // When saving, update the row with the new values
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
      editor: "input",
      validator: ["required", "unique"],
    },
  ];

  return (
    <div css={styles}>
      <ReactTabulator
        events={{
          dataChanged: handleDataChanged,
          rowClick: (e: PointerEvent, row: CellComponent) => {
            const excludedSelectors = [".delete-btn", ".copy-btn"];
            const target = e.target as Element;

            if (
              target &&
              !excludedSelectors.some((selector) => target.closest(selector))
            ) {
              handleRowClick(e, row);
            }
          },
        }}
        data={data}
        options={{
          movableColumns: true,
          columns: [
            ...columns,
            {
              title: "",
              formatter: CopyUrlButton,
              width: 40,
              hozAlign: "center",
              headerSort: false,
              cellClick: (_e: PointerEvent, cell: CellComponent) => {
                if (!cell || !cell.getRow()) {
                  console.error(
                    "The row this cell is attached to cannot be found. Ensure the table has not been reinitialized without being destroyed first."
                  );
                  return;
                }
                const rowData = cell.getData() as ProfileRow;
                handleDataUrlToClipboard(rowData);
              },
            },
            {
              title: "",
              formatter: DeleteButton,
              width: 40,
              hozAlign: "center",
              headerSort: false,
              cellClick: (_e: PointerEvent, cell: CellComponent) => {
                if (!cell || !cell.getRow()) {
                  console.error(
                    "The row this cell is attached to cannot be found. Ensure the table has not been reinitialized without being destroyed first."
                  );
                  return;
                }
                setDeleteRowOpen({
                  open: true,
                  callback: (confirmResult: boolean) => {
                    if (confirmResult)
                      handleDeleteRow(cell.getRow().getData().id);
                    setDeleteRowOpen(defaultConfirmCallback);
                  },
                  message: "Remove this row?",
                });
              },
            },
          ],
          theme: "Midnight",
        }}
      />
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => handleDataChanged([...data, { ...getDefaultRow() }])}
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
