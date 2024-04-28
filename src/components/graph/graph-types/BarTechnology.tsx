import { TechnologyRow } from "@src/components/Table";
import { useWindowResize } from "@src/hooks/useWindowResize";
import { Bar } from "react-chartjs-2";

export default function BarTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  return (
    <Bar
      key={`technology-${dimensions.height}-${dimensions.width}`}
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
            backgroundColor: data.map(
              (n) => `rgba(51,${Math.floor(n.ability * 25.5)},255,0.4)`
            ),
          },
        ],
      }}
    />
  );
}
