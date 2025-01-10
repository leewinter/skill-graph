import { useState } from 'react';
import { Dialog, IconButton, Card, CardHeader, CardContent } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

function FullscreenDialog({ children }: { children: (props: { fullscreen: boolean }) => React.ReactNode }) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div>
      <Card>
        <CardHeader
          action={<IconButton onClick={() => setFullscreen(true)}>
            <FullscreenIcon />
          </IconButton>} />
        <CardContent>
          {children({ fullscreen })}
        </CardContent>
      </Card>
      <Dialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        fullScreen
      >
        <CardHeader
          action={<IconButton onClick={() => setFullscreen(false)}>
            <CloseFullscreenIcon />
          </IconButton>} />
        <CardContent>
          {children({ fullscreen })}
        </CardContent>
      </Dialog>
    </div>
  );
}

export default FullscreenDialog;