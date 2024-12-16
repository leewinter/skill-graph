import Box from "@mui/material/Box";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { useWindowResize } from "@src/hooks/useWindowResize";
import * as d3 from "d3-scale-chromatic";
import { Pie } from "react-chartjs-2";

export default function PieTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600, // Restrict maximum width for better layout
        height: "auto",
        margin: "0 auto", // Center horizontally
        padding: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pie
        key={`technology-${dimensions.height}-${dimensions.width}`}
        datasetIdKey="technology"
        options={{
          responsive: true,
          maintainAspectRatio: false, // Allow dynamic height adjustment
          aspectRatio: 1, // Square ratio (1:1) for better vertical fitting
          animation: {
            delay: (context) => {
              let delay = 0;
              if (context.type === "data" && context.mode === "default") {
                delay = context.dataIndex * (1800 / data.length);
              }
              return delay;
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top", // Adjust legend position to save vertical space
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
        }}
        data={{
          labels: data.map((n) => n.technology),
          datasets: [
            {
              data: data.map((n) => n.ability),
              label: "Technology",
              backgroundColor: data.map(
                (_, i) => d3.schemeCategory10[i % d3.schemeCategory10.length]
              ),
              borderWidth: 0,
            },
          ],
        }}
        style={{
          height: Math.min(dimensions.height * 0.6, 400), // Restrict height dynamically
          maxHeight: 400,
        }}
      />
    </Box>
  );
}
