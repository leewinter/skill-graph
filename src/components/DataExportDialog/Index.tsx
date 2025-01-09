import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { QRCodeSVG } from "qrcode.react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export interface DataExportDialogProps {
  id: string;
  keepMounted: boolean;
  message: string | null;
  url: string | null;
  open: boolean;
  onClose: () => void;
}

export function DataExportDialog(props: DataExportDialogProps) {
  const { onClose, message, url, open, ...other } = props;

  const { t, ready } = useTranslation();

  if (!ready) return <div>{t("shared.loading")}</div>;

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: "600px" } }}
      open={open}
      {...other}
    >
      <DialogTitle>{message}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "1.5rem",
        }}
      >
        <Typography variant="body2">
          {t("dataExportDialog.p1")}          
        </Typography>
        {url && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Typography variant="body2">
              {t("dataExportDialog.qrP1")}              
            </Typography>
            <QRCodeSVG value={url} size={200} />
          </div>
        )}
        <Alert severity="info">
          {t("dataExportDialog.info1")}          
        </Alert>
        <TextField
          label={t("dataExportDialog.urlLabel")}
          value={url || ""}
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {t("shared.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
