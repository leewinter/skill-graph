import Box from "@mui/material/Box";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { useWindowResize } from "@src/hooks/useWindowResize";
import * as d3 from "d3-scale-chromatic";
import { Bar } from "react-chartjs-2";

import { hexToRgba } from "../graphHelpers";

export default function BarTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;
  const { dimensions } = useWindowResize();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800, // Restrict the maximum width for better layout
        height: "auto",
        margin: "0 auto", // Center horizontally
        padding: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Bar
        key={`technology-${dimensions.height}-${dimensions.width}`}
        datasetIdKey="technology"
        options={{
          indexAxis: "y", // Horizontal bars
          responsive: true,
          maintainAspectRatio: false, // Allow dynamic height adjustment
          plugins: {
            legend: {
              display: false, // Disable the default legend
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        }}
        data={{
          labels: data.map((n) => n.technology),
          datasets: [
            {
              data: data.map((n) => n.ability),
              backgroundColor: data.map(
                (_, i) =>
                  hexToRgba(
                    d3.schemeCategory10[i % d3.schemeCategory10.length],
                    0.6
                  ) // Add transparency
              ),
            },
          ],
        }}
        style={{
          height: Math.min(dimensions.height * 0.6, 500), // Restrict height dynamically
          maxHeight: 500,
        }}
      />
    </Box>
  );
}
