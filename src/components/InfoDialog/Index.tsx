import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { QRCodeSVG } from "qrcode.react";

export interface InfoDialogProps {
  id: string;
  keepMounted: boolean;
  message: string | null;
  url: string | null;
  open: boolean;
  onClose: () => void;
}

export function InfoDialog(props: InfoDialogProps) {
  const { onClose, message, url, open, ...other } = props;

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
          Your data URL has automatically been copied to the clipboard. You can
          share your profile by sending the below URL to someone.
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
              Scan the QR code below to access the link:
            </Typography>
            <QRCodeSVG value={url} size={200} />
          </div>
        )}
        <Alert severity="info">
          Please note that any changes made by the person opening the link will
          only apply to their own view, and will not affect your profile.
          Likewise, any changes you make will not be reflected in the shared
          link.
        </Alert>
        <TextField
          label="Shareable URL"
          value={url || ""}
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
