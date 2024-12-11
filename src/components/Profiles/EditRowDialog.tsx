import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@src/components/Button";
import Table from "@src/components/Table";

import { TechnologyRow } from "../Table/table-types";
import { ProfileRow } from "./profile-table-types";

export default function EditRowDialog({
  open,
  onClose,
  currentRow,
  setCurrentRow,
  saveRow,
}: {
  open: boolean;
  onClose: () => void;
  currentRow: ProfileRow | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<ProfileRow | null>>;
  saveRow: () => void;
}) {
  const handleTechnologiesChange = (technologies: TechnologyRow[]) => {
    setCurrentRow((prev) =>
      prev ? { ...prev, technologies: technologies } : null
    );
  };

  if (!currentRow) return null;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
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
          label="Name"
          value={currentRow?.name || ""}
          onChange={(e) => {
            setCurrentRow((prev) =>
              prev ? { ...prev, name: e.target.value } : null
            );
          }}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "16px" }}
        />
        <Table
          initData={currentRow.technologies}
          onDataChange={handleTechnologiesChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} text="Cancel" />
        <Button onClick={saveRow} text="Save" />
      </DialogActions>
    </Dialog>
  );
}
