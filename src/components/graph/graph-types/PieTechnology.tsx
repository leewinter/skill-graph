import { TechnologyRow } from "@src/components/Table";
import { useWindowResize } from "@src/hooks/useWindowResize";
import { Pie } from "react-chartjs-2";

export default function PieTechnology(props: { data: TechnologyRow[] }) {
  const { data } = props;

  const { dimensions } = useWindowResize();

  return (
    <Pie
      key={`technology-${dimensions.height}-${dimensions.width}`}
      datasetIdKey="technology"
      options={{
        responsive: true,
        animation: {
          delay: (context) => {
            let delay = 0;
            if (context.type === "data" && context.mode === "default") {
              // Adapt the data point index animation delay according to the quantity
              delay = context.dataIndex * (1800 / data.length);
            }
            return delay;
          },
        },
        plugins: {
          legend: {
            display: true, // You can customize the legend here if needed
          },
        },
        scales: {
          x: {
            display: false, // Remove the x-axis
          },
          y: {
            display: false, // Remove the y-axis
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
              (n) =>
                `rgba(51,${Math.floor(n.ability * 25.5)},${
                  Math.floor(Math.random() * (255 - 1 + 1)) + 1
                },0.4)`
            ),
            borderWidth: 0, // Remove the border to make it look cleaner
          },
        ],
      }}
    />
  );
}
