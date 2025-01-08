import * as d3 from "d3-scale-chromatic";

import { PolarArea } from "react-chartjs-2";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { hexToRgba } from "../graphHelpers";
import { useAvailableCategories } from "@src/hooks/useAvailableCategories";
import { useTranslation } from "react-i18next";
import { useWindowResize } from "@src/hooks/useWindowResize";
import FullscreenDialog from "@src/components/Graph/ChartContainer";

export default function PolarCategories(props: { data: TechnologyRow[] }) {
  const { data } = props;

  // Monitor window size
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

  const labels = Object.keys(categoryFrequency).map((c) =>
    categories.find((n) => n.value === c)?.label
  );
  const frequencies = Object.values(categoryFrequency);

  return (
    <FullscreenDialog>
      {({ fullscreen }) => {
        const chartHeight = fullscreen
          ? dimensions.height * 0.8 // Use a large proportion of the screen height in fullscreen
          : Math.min(dimensions.height * 0.6, 300); // Default size for non-fullscreen mode

        return (
          <PolarArea
            key={`categories-${dimensions.height}-${dimensions.width}`}
            datasetIdKey="categories"
            options={{
              responsive: true,
              maintainAspectRatio: false,
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
                x: { display: false },
                y: { display: false },
              },
            }}
            data={{
              labels: labels,
              datasets: [
                {
                  data: frequencies,
                  label: t(
                    "charts.polarCategories.datasets.categoryFrequencyLabel"
                  ),
                  backgroundColor: labels.map(
                    (_, i) =>
                      hexToRgba(
                        d3.schemeAccent[i % d3.schemeAccent.length],
                        0.6
                      )
                  ),
                  borderWidth: 0,
                },
              ],
            }}
            style={{
              height: chartHeight,
            }}
          />
        );
      }}
    </FullscreenDialog>
  );
}