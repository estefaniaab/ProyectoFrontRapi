import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useFetch from "../hooks/useFetch";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ChartData {
  name: string;
  value: number;
}

const TableTwo = () => {
  const { data: pedidos, loading: loading1 } = useFetch<ChartData[]>(
    "https://b13f0cb6-ff95-4bb2-870a-d3c844428190.mock.pstmn.io/PedidosPorRestaurante"
  );
  const { data: comidas, loading: loading2 } = useFetch<ChartData[]>(
    "https://b13f0cb6-ff95-4bb2-870a-d3c844428190.mock.pstmn.io/ComidaMasSolicitada"
  );
  const { data: accidentes, loading: loading3 } = useFetch<ChartData[]>(
    "https://b13f0cb6-ff95-4bb2-870a-d3c844428190.mock.pstmn.io/AccidentesPorMes"
  );

  const generateChartData = (data: ChartData[]) => ({
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Cantidad",
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(230, 9, 9, 0.6)",
          "rgba(9, 80, 128, 0.6)",
          "rgba(243, 184, 34, 0.6)",
          "rgba(23, 85, 85, 0.6)",
          "rgba(61, 13, 156, 0.6)",
          "rgba(129, 69, 9, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  if (loading1 || loading2 || loading3) return <p>Cargando datos...</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
      <h4 className="text-xl font-semibold text-black dark:text-white mb-6">
        Barras
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primer gráfico */}
        <div className="flex flex-col items-center">
          <h5 className="mb-4 text-base font-medium text-black dark:text-white">
            Pedidos por Restaurante
          </h5>
          <div className="w-200 h-300">{pedidos && <Bar data={generateChartData(pedidos)} />}</div>
        </div>

        {/* Segundo gráfico */}
        <div className="flex flex-col items-center">
          <h5 className="mb-4 text-base font-medium text-black dark:text-white">
            Comida Más Solicitada
          </h5>
          <div className="w-200 h-300">{comidas && <Bar data={generateChartData(comidas)} />}</div>
        </div>

        {/* Tercer gráfico ocupa toda la fila */}
        <div className="flex flex-col items-center md:col-span-2">
          <h5 className="mb-4 text-base font-medium text-black dark:text-white">
            Accidentes por Mes
          </h5>
          <div className="w-200 h-300">{accidentes && <Bar data={generateChartData(accidentes)} />}</div>
        </div>
      </div>
    </div>
  );
};

export default TableTwo;
