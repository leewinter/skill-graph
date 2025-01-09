import * as d3 from "d3-scale-chromatic";

import { Bar } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { hexToRgba } from "../graphHelpers";
import { useTranslation } from "react-i18next";
import { useWindowResize } from "@src/hooks/useWindowResize";

export default function BarTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;
  const { dimensions } = useWindowResize();

  const { t, ready } = useTranslation();

  if (!ready) return <div>{t("shared.loading")}</div>;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        height: "auto",
        margin: "0 auto",
        padding: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Bar
        key={`technology-${dimensions.height}-${dimensions.width}`}
        datasetIdKey="technology"
        options={{
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: t("charts.barTechnology.title"),
              font: {
                size: 20,
                weight: "bold",
              },
              padding: {
                top: 10,
                bottom: 20,
              },
            },
            legend: {
              display: false,
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
              label: t("charts.barTechnology.datasets.abilityLabel"),
              backgroundColor: data.map(
                (_, i) =>
                  hexToRgba(
                    d3.schemeCategory10[i % d3.schemeCategory10.length],
                    0.9
                  ) // Add transparency
              ),
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
