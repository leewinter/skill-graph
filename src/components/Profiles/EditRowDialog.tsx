import Button from "@src/components/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ProfileRow } from "./profile-table-types";
import { TechnologyRow } from "../TechnologyTable/table-types";
import TechnologyTable from "@src/components/TechnologyTable";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

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
  const { t, ready } = useTranslation();

  const handleTechnologiesChange = (technologies: TechnologyRow[]) => {
    setCurrentRow((prev) =>
      prev ? { ...prev, technologies: technologies } : null
    );
  };

  if (!ready) return <div>{t("shared.loading")}</div>;

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
      <DialogTitle>{t("profiles.editRowDialog.title")}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label={t("profiles.editRowDialog.nameInputLabel")}
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
        <TechnologyTable
          initData={currentRow.technologies}
          onDataChange={handleTechnologiesChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} text={t("shared.cancel")} />
        <Button onClick={saveRow} text={t("shared.save")} />
      </DialogActions>
    </Dialog>
  );
}
