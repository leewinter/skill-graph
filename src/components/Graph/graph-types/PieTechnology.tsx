import Box from "@mui/material/Box";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { useWindowResize } from "@src/hooks/useWindowResize";
import * as d3 from "d3-scale-chromatic";
import { Pie } from "react-chartjs-2";

import { hexToRgba } from "../graphHelpers";

export default function PieTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        margin: "0 auto",
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
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            title: {
              display: true,
              text: "Technology Distribution",
              font: {
                size: 18,
                weight: "bold",
              },
              padding: {
                top: 10,
                bottom: 20,
              },
            },
            legend: {
              display: true,
              position: "top",
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
              label: "Ability",
              backgroundColor: data.map(
                (_, i) =>
                  hexToRgba(
                    d3.schemeCategory10[i % d3.schemeCategory10.length],
                    0.9
                  ) // Add transparency
              ),
              borderWidth: 0,
            },
          ],
        }}
        style={{
          height: Math.min(dimensions.height * 0.6, 300), // Restrict height dynamically
          maxHeight: 300,
        }}
      />
    </Box>
  );
}
