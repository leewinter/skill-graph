import Stack from "@mui/material/Stack";
import Button from "@src/components/Button";
import {
  ConfirmationCallback,
  ConfirmDialog,
  defaultConfirmCallback,
} from "@src/components/ConfirmDialog";
import { useState } from "react";
import { ReactTabulator } from "react-tabulator";
import { CellComponent } from "tabulator-tables";

import EditRowDialog from "./EditRowDialog";
import { getDefaultRow, TechnologyRow } from "./table-types";
import { useTabulatorModernStyles } from "./use-tabulator-modern-styles";

const DeleteButton = () => "<button class='delete-btn'>X</button>";

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

  if (!data) return null;

  return (
    <div css={styles}>
      <ReactTabulator
        events={{
          dataChanged: handleDataChanged,
          rowClick: (e: PointerEvent, row: CellComponent) => {
            if (e.target && !(e.target as Element).closest(".delete-btn")) {
              const rowData = row.getData() as TechnologyRow;
              handleRowClick(rowData);
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
          onClick={() => {
            const newRow = getDefaultRow();
            handleDataChanged([...data, { ...newRow }]);
            handleRowClick(newRow);
          }}
          text="Add Row"
        />
      </Stack>
      <ConfirmDialog
        id="delete-row-confirmation"
        keepMounted
        onClose={deleteRowOpen.callback}
        open={deleteRowOpen.open}
        message={deleteRowOpen.message}
      />
      <EditRowDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        saveRow={saveRow}
      />
    </div>
  );
}
