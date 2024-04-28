import { TechnologyRow } from "@src/components/Table";
import { useWindowResize } from "@src/hooks/useWindowResize";
import { ScriptableContext } from "chart.js";
import { Radar } from "react-chartjs-2";

export default function RadarTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  return (
    <Radar
      key={`technology-${dimensions.height}-${dimensions.width}`}
      width={100}
      height={30}
      datasetIdKey="technology"
      options={{
        indexAxis: "y",
        responsive: true,
        animation: {
          delay: (context) => {
            let delay = 0;
            if (context.type === "data" && context.mode === "default") {
              // Adapt the data point index animation delay according to the quantity. This will prevent massive datasets taking 3 days to load
              delay = context.dataIndex * (1800 / data.length);
            }
            return delay;
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
            label: "Technology",
            backgroundColor: (context: ScriptableContext<"radar">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, -520, 0, 620);
              gradient.addColorStop(0, "rgba(176, 0, 255,0.3)");
              gradient.addColorStop(1, "rgba(0, 0, 255,0.3)");
              return gradient;
            },
          },
        ],
      }}
    />
  );
}
