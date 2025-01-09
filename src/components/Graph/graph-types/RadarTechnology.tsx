import * as d3 from "d3-scale-chromatic";

import { CoreChartOptions, ScriptableContext } from "chart.js";

import Box from "@mui/material/Box";
import { Radar } from "react-chartjs-2";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { hexToRgba } from "../graphHelpers";
import { useTranslation } from "react-i18next";
import { useWindowResize } from "@src/hooks/useWindowResize";

interface ChartOptionsShim extends CoreChartOptions<"radar"> {
  script: { min: number; max: number };
}

export default function RadarTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  const technologyColours = d3.schemeCategory10;
  const categoryColours = d3.schemeAccent;

  const { t, ready } = useTranslation();

  if (!ready) return <div>{t("shared.loading")}</div>;

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
                text: t("charts.radarTechnology.title"),
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
              label: t("charts.radarTechnology.datasets.abilityLabel"),
              backgroundColor: hexToRgba(technologyColours[0], 0.6),
              borderColor: hexToRgba(technologyColours[1], 0.8),
              pointBackgroundColor: data.map((_, i) =>
                hexToRgba(technologyColours[i % technologyColours.length], 0.8)
              ),
              borderWidth: 0,
            },
            {
              data: data.map((n) => n.category.length),
              label: t("charts.radarTechnology.datasets.categoryCountLabel"),
              backgroundColor: hexToRgba(categoryColours[2], 0.6),
              borderColor: hexToRgba(categoryColours[3], 0.8),
              pointBackgroundColor: data.map((_, i) =>
                hexToRgba(categoryColours[i % categoryColours.length], 0.9)
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
