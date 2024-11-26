/** @jsxImportSource @emotion/react */
import { ReactTabulator } from "react-tabulator";
import { useEffect, useRef, useState } from "react";
import localforage from "localforage";
import { CellComponent } from "tabulator-tables";
import Button from "@src/components/Button";
import { dataKey } from "@src/constants";
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

function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

export type TechnologyRow = {
  technology: string;
  ability: number;
  category: string[];
};

const DeleteButton = function () {
  return "<button style='background-color: #FFCCCB;'>X</button>";
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
    editor: true,
    formatterParams: {
      stars: 10,
    },
  },
  {
    title: "Category",
    field: "category",
    editor: "list",
    sorter: "array",
    editorParams: {
      values: ["Infrastructure", "UI", "Cloud", "Backend", "Data"],
      multiselect: true,
      clearable: true,
      verticalNavigation: "hybrid",
    },
  },
];

const defaultRow: TechnologyRow = { technology: "", ability: 1, category: [] };

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

  const styles = useTabulatorModernStyles();

  const table = useRef(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("data")) {
      const confirmation = {
        open: true,
        callback: (confirmResult: boolean) => {
          const base64Data = searchParams.get("data");
          if (base64Data) {
            const jsonData = base64AsData<TechnologyRow[]>(base64Data);
            if (confirmResult && jsonData) {
              handleDataChanged(jsonData);
            }
          }
          setImportDataOpen(defaultConfirmCallback);
        },
      };
      setImportDataOpen(confirmation);
    } else {
      localforage.getItem(dataKey, function (err, value) {
        if (err) throw err;
        if (value) setData(value as TechnologyRow[]);
      });
    }
  }, []);

  const handleDataChanged = (d: TechnologyRow[]) => {
    const withOnlyUnique = d.map((n: TechnologyRow) => {
      return { ...n, category: [...new Set(n.category)] };
    });
    setData(withOnlyUnique);
    localforage.setItem(dataKey, withOnlyUnique, function (err) {
      if (err) throw err;
    });
  };

  const handleDeleteRow = (cell: CellComponent) => {
    const cellData = cell.getData();
    const result = data.filter((n) => n.technology !== cellData.technology);
    handleDataChanged(result);
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

  return (
    <div css={styles}>
      <ReactTabulator
        events={{
          dataChanged: handleDataChanged,
        }}
        onRef={(ref) => (table.current = ref.current)}
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
              cellClick: function (_e: PointerEvent, cell: CellComponent) {
                const confirmation = {
                  open: true,
                  callback: (confirmResult: boolean) => {
                    if (confirmResult) handleDeleteRow(cell);
                    setDeleteRowOpen(defaultConfirmCallback);
                  },
                };
                setDeleteRowOpen(confirmation);
              },
            },
          ],
          theme: "Midnight",
        }}
      />
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => {
            handleDataChanged([...data, defaultRow]);
          }}
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
    </div>
  );
}
