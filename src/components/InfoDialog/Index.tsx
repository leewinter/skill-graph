import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

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
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 435 } }}
      maxWidth="md"
      open={open}
      {...other}
    >
      <DialogTitle>{message}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          <Link href={url || undefined} target="_blank" rel="noopener">
            {url}
          </Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
