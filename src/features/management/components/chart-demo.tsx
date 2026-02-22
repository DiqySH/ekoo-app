import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const demoChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 100, 3, 5, 2, null, 4],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      demoChart.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className="max-w-75 max-h-75"></canvas>;
};

export default ChartDemo;
