import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Skill Graph
      </Typography>
      <Typography variant="body1" gutterBottom>
        All data is stored locally!
      </Typography>
      <Typography variant="caption" gutterBottom>
        A simple solution to input a list of skills with an ability score. All
        data is stored locally in the browser using IndexedDB, Web SQL, or local
        storage (based on browser and version).
      </Typography>
    </div>
  );
}
