import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export interface ConfirmDialogProps {
  id: string;
  keepMounted: boolean;
  message: string | null;
  open: boolean;
  onClose: (value: boolean) => void;
}

export type ConfirmationCallback = {
  open: boolean;
  callback: (confirm: boolean) => void;
  message: string;
};

export const defaultConfirmCallback = {
  open: false,
  callback: () => {},
  message: "",
};

export function ConfirmDialog(props: ConfirmDialogProps) {
  const { onClose, message, open, ...other } = props;
  const radioGroupRef = useRef<HTMLElement>(null);

  const { t, ready } = useTranslation();

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleNo = () => {
    onClose(false);
  };

  const handleYes = () => {
    onClose(true);
  };

  if (!ready) return <div>{t("shared.loading")}</div>;

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleNo}>
          {t("shared.no")}
        </Button>
        <Button onClick={handleYes}>{t("shared.yes")}</Button>
      </DialogActions>
    </Dialog>
  );
}
