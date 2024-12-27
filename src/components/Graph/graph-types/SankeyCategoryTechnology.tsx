import Box from "@mui/material/Box";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { useWindowResize } from "@src/hooks/useWindowResize";
import { Chart as ChartJs, registerables } from "chart.js";
import { Flow, SankeyController } from "chartjs-chart-sankey";
import * as d3 from "d3-scale-chromatic";
import { Chart } from "react-chartjs-2";

import { hexToRgba } from "../graphHelpers";

interface SankeyDataPoint {
  from: string;
  to: string;
  flow: number;
}

// Register required Chart.js components
ChartJs.register(...registerables, SankeyController, Flow);

export default function SankeyTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  // Transform the data into a Sankey-compatible format
  const links: SankeyDataPoint[] = data.flatMap((row) =>
    row.category.map((category) => ({
      from: category, // Each category becomes a source
      to: row.technology, // Technology becomes the target
      flow: row.ability / row.category.length, // Distribute the ability value among categories
    }))
  );

  // Map technologies to unique colors using d3.schemeCategory10
  const technologyColors = Object.fromEntries(
    Array.from(new Set(data.map((row) => row.technology))).map((tech, i) => [
      tech,
      hexToRgba(d3.schemeCategory10[i % d3.schemeCategory10.length], 0.9),
    ])
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800, // Adjust Sankey chart width
        height: "auto",
        margin: "0 auto", // Center horizontally
        padding: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Chart
        type="sankey"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: (tooltipItems) =>
                  tooltipItems.length > 0
                    ? `From: ${
                        (tooltipItems[0].raw as SankeyDataPoint).from
                      } → To: ${(tooltipItems[0].raw as SankeyDataPoint).to}`
                    : "",
                label: (tooltipItem) =>
                  `Value: ${
                    (tooltipItem.raw as SankeyDataPoint)?.flow.toFixed(2) || 0
                  }`,
              },
            },
            title: {
              display: true,
              text: "Sankey Chart: Categories to Technologies",
              font: {
                size: 18,
                weight: "bold",
              },
              padding: {
                top: 10,
                bottom: 20,
              },
            },
          },
          layout: {
            padding: 20,
          },
        }}
        data={{
          datasets: [
            {
              label: "Category to Technology Flow",
              data: links,
              colorFrom: (ctx) =>
                ctx.raw && (ctx.raw as SankeyDataPoint).from
                  ? "#ff6384"
                  : "#36a2eb", // Default category color
              colorTo: (ctx) =>
                ctx.raw && (ctx.raw as SankeyDataPoint).to
                  ? technologyColors[(ctx.raw as SankeyDataPoint).to]
                  : "#ffcd56", // Use mapped technology colors
              borderWidth: 0,
            },
          ],
        }}
        style={{
          height: Math.min(dimensions.height * 0.6, 500), // Dynamically adjust height
          maxHeight: 500,
        }}
      />
    </Box>
  );
}
