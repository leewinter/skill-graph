/** @jsxImportSource @emotion/react */
import MuiButton from "@mui/material/Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Button({
  text,
  onClick,
  disabled = false, // Default value set to false
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled} // Automatically styles when disabled
    >
      {text}
    </MuiButton>
  );
}
