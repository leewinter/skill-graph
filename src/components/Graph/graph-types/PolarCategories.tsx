import Box from "@mui/material/Box";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { useWindowResize } from "@src/hooks/useWindowResize";
import * as d3 from "d3-scale-chromatic";
import { PolarArea } from "react-chartjs-2";

import { hexToRgba } from "../graphHelpers";

export default function PolarCategories(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  // Calculate the frequency of each category
  const categoryFrequency = data
    .flatMap((row) => row.category)
    .reduce((acc: Record<string, number>, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

  const labels = Object.keys(categoryFrequency);
  const frequencies = Object.values(categoryFrequency);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        height: "auto",
        margin: "0 auto",
        padding: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PolarArea
        key={`categories-${dimensions.height}-${dimensions.width}`}
        datasetIdKey="categories"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            title: {
              display: true,
              text: "Category Frequency Distribution",
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
          labels: labels,
          datasets: [
            {
              data: frequencies,
              label: "Category Frequency",
              backgroundColor: labels.map(
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
