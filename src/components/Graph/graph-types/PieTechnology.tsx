import * as d3 from "d3-scale-chromatic";

import { Pie } from "react-chartjs-2";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { hexToRgba } from "../graphHelpers";
import { useTranslation } from "react-i18next";
import { useWindowResize } from "@src/hooks/useWindowResize";
import FullscreenDialog from "@src/components/Graph/ChartContainer";

export default function PieTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  const { t, ready } = useTranslation();

  if (!ready) return <div>{t("shared.loading")}</div>;

  return (
    <FullscreenDialog>
      {({ fullscreen }) => {
        const chartHeight = fullscreen
          ? dimensions.height * 0.8 // Use a large proportion of the screen height in fullscreen
          : Math.min(dimensions.height * 0.6, 300); // Default size for non-fullscreen mode

        return (
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
                  text: t("charts.pieTechnology.title"),
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
                  label: t("charts.pieTechnology.datasets.abilityLabel"),
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
              height: chartHeight,
            }}
          />
        );
      }}
    </FullscreenDialog>
  );
}
