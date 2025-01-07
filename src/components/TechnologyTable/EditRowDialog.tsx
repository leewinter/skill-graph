import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@src/components/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import { TechnologyRow } from "./table-types";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAvailableCategories } from "@src/hooks/useAvailableCategories";
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
  currentRow: TechnologyRow | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<TechnologyRow | null>>;
  saveRow: () => void;
}) {
  const { t, ready } = useTranslation();

  const categories = useAvailableCategories();

  if (!ready) return <div>{t("shared.loading")}</div>;
  
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
      <DialogTitle>{t("technologyTable.editRowDialog.title")}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label={t("technologyTable.editRowDialog.technologyInputLabel")}
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
        <Box sx={{ margin: "0 auto", textAlign: "center" }}>
          <Typography id="slider-description" variant="h6" gutterBottom>
            {t("technologyTable.editRowDialog.abilitySliderLabel")}
          </Typography>

          <Slider
            valueLabelDisplay="on"
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
            style={{ marginBottom: "16px" }}
          />
        </Box>
        <Autocomplete
          fullWidth
          multiple
          options={categories}
          value={categories.filter((option) =>
            (currentRow?.category || []).includes(option.value)
          )}
          onChange={(_event, newValue) => {
            setCurrentRow((prev) =>
              prev ? { ...prev, category: newValue.map((option) => option.value) } : null
            );
          }}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("technologyTable.editRowDialog.categoriesInputLabel")}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} text={t("shared.cancel")} />
        <Button onClick={saveRow} text={t("shared.update")} />
      </DialogActions>
    </Dialog>
  );
}
