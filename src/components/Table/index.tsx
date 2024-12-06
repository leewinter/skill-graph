import { ReactTabulator } from "react-tabulator";
import { useEffect, useState } from "react";
import localforage from "localforage";
import { CellComponent } from "tabulator-tables";
import Button from "@src/components/Button";
import { DATA_KEY } from "@src/constants";
import { useSearchParams } from "react-router-dom";
import { base64AsData, dataAsBase64 } from "@src/utils/base64";
import {
  ConfirmDialog,
  ConfirmationCallback,
  defaultConfirmCallback,
} from "@src/components/ConfirmDialog";
import { InfoDialog } from "@src/components/InfoDialog/Index";
import { useTabulatorModernStyles } from "./use-tabulator-modern-styles";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import { v4 as uuidv4 } from "uuid";

function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => console.log("Text copied to clipboard"))
    .catch((err) => console.error("Failed to copy text: ", err));
}

export type TechnologyRow = {
  id: string;
  technology: string;
  ability: number;
  category: string[];
};

const DeleteButton = () => "<button class='delete-btn'>X</button>";

const defaultRow: TechnologyRow = {
  id: uuidv4(),
  technology: "",
  ability: 1,
  category: [],
};
const initData: TechnologyRow[] = [];

export default function Table() {
  const [data, setData] = useState<TechnologyRow[]>(initData);
  const [importDataOpen, setImportDataOpen] = useState<ConfirmationCallback>(
    defaultConfirmCallback
  );
  const [deleteRowOpen, setDeleteRowOpen] = useState<ConfirmationCallback>(
    defaultConfirmCallback
  );
  const [dataUrlOpen, setDataUrlOpen] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState<TechnologyRow | null>(null);

  const styles = useTabulatorModernStyles();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("data")) {
      const base64Data = searchParams.get("data");
      const confirmation = {
        open: true,
        callback: (confirmResult: boolean) => {
          if (base64Data && confirmResult) {
            const jsonData = base64AsData<TechnologyRow[]>(base64Data);
            if (jsonData) handleDataChanged(jsonData);
          }
          setImportDataOpen(defaultConfirmCallback);
        },
      };
      setImportDataOpen(confirmation);
    } else {
      localforage.getItem(DATA_KEY, (err, value) => {
        if (err) throw err;
        if (value) setData(value as TechnologyRow[]);
      });
    }
  }, [searchParams]);

  const handleDataChanged = (updatedData: TechnologyRow[]) => {
    const uniqueCategories = updatedData.map((item) => ({
      ...item,
      category: [...new Set(item.category)],
    }));
    setData(uniqueCategories);
    localforage.setItem(DATA_KEY, uniqueCategories, (err) => {
      if (err) throw err;
    });
  };

  const handleDeleteRow = (id: string) => {
    const filteredData = data.filter((item) => item.id !== id);
    handleDataChanged(filteredData);
  };

  const handleDataUrlToClipboard = () => {
    const base64Data = dataAsBase64<TechnologyRow[]>(data);
    const dataUrl = `${window.location.href.replace(
      window.location.search,
      ""
    )}?data=${base64Data}`;
    copyToClipboard(dataUrl);
    setDataUrlOpen(dataUrl);
  };

  const handleRowClick = (_e: PointerEvent, row: CellComponent) => {
    const rowData = row.getData() as TechnologyRow;
    setCurrentRow(rowData);
    setSelectedCategories(rowData.category || []);
    setDialogOpen(true);
  };

  // When saving, update the row with the new values
  const saveRow = () => {
    if (currentRow) {
      const updatedData = data.map((row) => {
        if (row.id === currentRow.id) {
          return { ...currentRow, category: selectedCategories };
        }
        return row;
      });
      handleDataChanged(updatedData);
    }
    setDialogOpen(false);
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

  return (
    <div css={styles}>
      <ReactTabulator
        events={{
          dataChanged: handleDataChanged,
          rowClick: (e: PointerEvent, row: CellComponent) => {
            if (e.target && !(e.target as Element).closest(".delete-btn")) {
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
                });
              },
            },
          ],
          theme: "Midnight",
        }}
      />
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() =>
            handleDataChanged([...data, { ...defaultRow, id: uuidv4() }])
          }
          text="Add Row"
        />
        <Button
          onClick={handleDataUrlToClipboard}
          text="Copy Data Url to Clipboard"
          disabled={data.length === 0}
        />
      </Stack>
      <ConfirmDialog
        id="import-data-confirmation"
        keepMounted
        onClose={importDataOpen.callback}
        open={importDataOpen.open}
        message="Import received url data?"
      />
      <ConfirmDialog
        id="delete-row-confirmation"
        keepMounted
        onClose={deleteRowOpen.callback}
        open={deleteRowOpen.open}
        message="Remove this row?"
      />
      <InfoDialog
        id="data-url-confirmation"
        keepMounted
        onClose={() => setDataUrlOpen(null)}
        open={Boolean(dataUrlOpen)}
        message="Url copied to the clipboard"
        url={dataUrlOpen}
      />
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            minHeight: "300px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Technology"
            value={currentRow?.technology || ""}
            onChange={(e) => {
              setCurrentRow((prev) =>
                prev ? { ...prev, technology: e.target.value } : null
              );
            }}
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px" }}
          />
          <Slider
            value={currentRow?.ability || 1}
            onChange={(_e, newValue) =>
              setCurrentRow((prev) =>
                prev ? { ...prev, ability: newValue as number } : null
              )
            }
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            style={{ marginBottom: "16px" }}
          />
          <Autocomplete
            fullWidth
            multiple
            options={["Infrastructure", "UI", "Cloud", "Backend", "Data"]}
            value={selectedCategories}
            onChange={(_event, newValue) => setSelectedCategories(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} text="Cancel" />
          <Button onClick={saveRow} text="Save" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
