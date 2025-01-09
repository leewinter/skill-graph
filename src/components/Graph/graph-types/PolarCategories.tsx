import * as d3 from "d3-scale-chromatic";

import Box from "@mui/material/Box";
import { PolarArea } from "react-chartjs-2";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { hexToRgba } from "../graphHelpers";
import { useAvailableCategories } from "@src/hooks/useAvailableCategories";
import { useTranslation } from "react-i18next";
import { useWindowResize } from "@src/hooks/useWindowResize";

export default function PolarCategories(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  const categories = useAvailableCategories();

  const { t, ready } = useTranslation();

  if (!ready) return <div>{t("shared.loading")}</div>;

  // Calculate the frequency of each category
  const categoryFrequency = data
    .flatMap((row) => row.category)
    .reduce((acc: Record<string, number>, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

  const labels = Object.keys(categoryFrequency).map(c=> categories.find(n=>n.value === c)?.label);
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
              text: t("charts.polarCategories.title"),
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
              label: t("charts.polarCategories.datasets.categoryFrequencyLabel"),
              backgroundColor: labels.map(
                (_, i) =>
                  hexToRgba(d3.schemeAccent[i % d3.schemeAccent.length], 0.6) // Add transparency
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
