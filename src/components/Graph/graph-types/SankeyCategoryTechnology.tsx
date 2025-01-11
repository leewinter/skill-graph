import * as d3 from "d3-scale-chromatic";

import { Chart as ChartJs, registerables } from "chart.js";
import { Flow, SankeyController } from "chartjs-chart-sankey";

import FullscreenDialog from "@src/components/Graph/ChartContainer";
import { Chart } from "react-chartjs-2";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { extractUniqueCatgories } from "../graphHelpers";
import { hexToRgba } from "../graphHelpers";
import { useAvailableCategories } from "@src/hooks/useAvailableCategories";
import { useTranslation } from "react-i18next";
import { useWindowResize } from "@src/hooks/useWindowResize";

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

  const categories = useAvailableCategories();

  const { t, ready } = useTranslation();

  // Transform the data into a Sankey-compatible format
  const links: SankeyDataPoint[] = data.flatMap((row) =>
    row.category.map((category) => ({
      from: categories.find(c => c.value === category)?.label || "", // Each category becomes a source
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

  const uniqueCategories = extractUniqueCatgories(data);
  const categoryColors = Object.fromEntries(
    uniqueCategories.map((cat, i) => [
      categories.find(c => c.value === cat)?.label || "",
      hexToRgba(d3.schemeAccent[i % d3.schemeAccent.length], 0.9),
    ])
  );

  if (!ready) return <div>{t("shared.loading")}</div>;

  return (
    <FullscreenDialog>
      {({ fullscreen }) => {
        const chartHeight = fullscreen
          ? dimensions.height * 0.8
          : Math.min(dimensions.height * 0.6, 500);

        return (
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
                        ? `From: ${(tooltipItems[0].raw as SankeyDataPoint).from
                        } → To: ${(tooltipItems[0].raw as SankeyDataPoint).to}`
                        : "",
                    label: (tooltipItem) =>
                      `Ability Split: ${(tooltipItem.raw as SankeyDataPoint)?.flow.toFixed(2) || 0
                      }`,
                  },
                },
                title: {
                  display: true,
                  text: t("charts.sankeyTechnology.title"),
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
                  label: t("charts.sankeyTechnology.datasets.categoryToTechLabel"),
                  data: links,
                  colorFrom: (ctx) =>
                    ctx.raw && (ctx.raw as SankeyDataPoint).from
                      ? categoryColors[(ctx.raw as SankeyDataPoint).from]
                      : "#36a2eb", // Default category color
                  colorTo: (ctx) =>
                    ctx.raw && (ctx.raw as SankeyDataPoint).to
                      ? technologyColors[(ctx.raw as SankeyDataPoint).to]
                      : "#ffcd56",
                  borderWidth: 0,
                },
              ],
            }}
            style={{
              height: chartHeight,
              maxHeight: chartHeight
            }}
          />
        );
      }}
    </FullscreenDialog>
  );
}
