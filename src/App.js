import "./App.css";
import Header from "./components/Header";
import useGetFilterData from "./hooks/useGetFilterData";
import useChartDataset from "./hooks/useChartDataset";
import useCSVReader from "./hooks/useCSVReader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

function App() {
  const appData = useCSVReader();
  const filterData = useGetFilterData(appData);
  const [dataByApp, dataByDate, appDataSet] = useChartDataset(
    appData,
    filterData.app,
    filterData.date
  );

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Line
          data={{
            labels: filterData?.date || [],
            datasets: appDataSet,
          }}
        />
      </header>
    </div>
  );
}

export default App;
