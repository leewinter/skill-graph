import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Button from "@src/components/Button";

import { TechnologyRow } from "./table-types";

export default function EditRowDialog({
  open,
  onClose,
  currentRow,
  setCurrentRow,
  selectedCategories,
  setSelectedCategories,
  saveRow,
}: {
  open: boolean;
  onClose: () => void;
  currentRow: TechnologyRow | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<TechnologyRow | null>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  saveRow: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        <Button onClick={onClose} text="Cancel" />
        <Button onClick={saveRow} text="Update" />
      </DialogActions>
    </Dialog>
  );
}
