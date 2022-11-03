import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./App.css";
import calculateSuccessChance from "./lib/successChance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const colors = {
  light: "rgb(220, 220, 255)",
  medium: "rgb(180, 180, 250)",
  dark: "rgb(160, 160, 240)",
};

function App() {
  const [diceSize, setDiceSize] = useState<number>(20);
  const [modifier, setModifier] = useState<number>(0);

  const diceSizes: { value: number; label: string }[] = [
    { value: 4, label: "D4" },
    { value: 6, label: "D6" },
    { value: 8, label: "D8" },
    { value: 10, label: "D10" },
    { value: 12, label: "D12" },
    { value: 16, label: "D16" },
    { value: 20, label: "D20" },
  ];

  const options = {
    plugins: {
      title: {
        display: true,
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const dcs = Array.from(Array(20), (_, i) => i + 1);

  console.log({ dcs });

  const data = {
    labels: dcs,
    datasets: [
      {
        label: "Disadvantage",
        data: dcs.map((dc) =>
          calculateSuccessChance({
            target: dc,
            diceSize: diceSize,
            diceCount: 2,
            disadvantage: true,
            modifier: modifier,
          })
        ),
        backgroundColor: colors.light,
        stack: "Stack 0",
      },
      {
        label: "Standard",
        data: dcs.map((dc) =>
          calculateSuccessChance({
            target: dc,
            diceSize: diceSize,
            diceCount: 1,
            disadvantage: false,
            modifier: modifier,
          })
        ),
        backgroundColor: colors.dark,
        stack: "Stack 1",
      },
      {
        label: "Advantage",
        data: dcs.map((dc) =>
          calculateSuccessChance({
            target: dc,
            diceSize: diceSize,
            diceCount: 2,
            disadvantage: false,
            modifier: modifier,
          })
        ),
        backgroundColor: colors.medium,
        stack: "Stack 2",
      },
    ],
  };

  return (
    <div className="App" style={{ width: 800, height: 800 }}>
      <div>Dice</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {diceSizes.map((ds) => (
          <button
            style={{
              height: 48,
              width: 48,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 8,
              borderRadius: 6,
              backgroundColor:
                ds.value === diceSize ? colors.dark : colors.light,
            }}
            onClick={() => setDiceSize(ds.value)}
          >
            {ds.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>Modifier</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            height: 48,
            width: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 8,
            borderRadius: 6,
            backgroundColor: colors.medium,
          }}
          onClick={() => setModifier((prev) => prev - 1)}
        >
          -
        </button>
        <div
          style={{
            height: 48,
            width: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 8,
            borderRadius: 6,
            backgroundColor: colors.light,
          }}
        >
          {modifier}
        </div>
        <button
          style={{
            height: 48,
            width: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 8,
            borderRadius: 6,
            backgroundColor: colors.medium,
          }}
          onClick={() => setModifier((prev) => prev + 1)}
        >
          +
        </button>
      </div>
      <div style={{ height: 12 }} />
      <Bar options={options} data={data} />
    </div>
  );
}

export default App;
