import Box from "@mui/material/Box";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { useWindowResize } from "@src/hooks/useWindowResize";
import { CoreChartOptions, ScriptableContext } from "chart.js";
import * as d3 from "d3-scale-chromatic";
import { Radar } from "react-chartjs-2";

import { hexToRgba } from "../graphHelpers";

interface ChartOptionsShim extends CoreChartOptions<"radar"> {
  script: { min: number; max: number };
}

export default function RadarTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  // Generate a distinct color palette using d3
  const colors = d3.schemeCategory10; // This palette has 10 visually distinct colors

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
      <Radar
        key={`technology-${dimensions.height}-${dimensions.width}`}
        datasetIdKey="technology"
        options={
          {
            responsive: true,
            maintainAspectRatio: false, // Allow dynamic height adjustment
            aspectRatio: 1, // Square aspect ratio
            animation: {
              delay: (context: ScriptableContext<"radar">) => {
                let delay = 0;
                if (context.type === "data" && context.mode === "default") {
                  delay = context.dataIndex * (1800 / data.length);
                }
                return delay;
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Technology Ability Radar Chart",
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
                display: false,
                position: "top",
              },
            },
            scale: {
              min: 0,
              max: 10,
            },
          } as unknown as ChartOptionsShim
        }
        data={{
          labels: data.map((n) => n.technology),
          datasets: [
            {
              data: data.map((n) => n.ability),
              label: "Technology",
              backgroundColor: hexToRgba(colors[0], 0.3),
              borderColor: hexToRgba(colors[1], 0.8),
              pointBackgroundColor: data.map((_, i) =>
                hexToRgba(colors[i % colors.length], 0.8)
              ),
              borderWidth: 1,
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
