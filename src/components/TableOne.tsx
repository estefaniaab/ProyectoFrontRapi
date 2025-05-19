import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import useFetch from "../hooks/useFetch";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_PARA_GRAFICOS = import.meta.env.VITE_POSTMAN_LOGIN_USER;

interface ChartData {
  name: string;
  value: number;
}

const TableOne = () => {
  const { data: pedidos, loading: loading1 } = useFetch<ChartData[]>(
    API_PARA_GRAFICOS + "/PedidosPorRestaurante"
  );
  const { data: comidas, loading: loading2 } = useFetch<ChartData[]>(
    API_PARA_GRAFICOS + "/ComidaMasSolicitada"
  );
  const { data: accidentes, loading: loading3 } = useFetch<ChartData[]>(
    API_PARA_GRAFICOS + "/AccidentesPorMes"
  );

  const generateChartData = (data: ChartData[]) => ({
    labels: data.map((item) => item.name),
    datasets: [
      {
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
          "rgba(255, 107, 107, 1)",
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
        Circulares
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <h5 className="mb-4 text-base font-medium text-black dark:text-white">
            Pedidos por Restaurante
          </h5>
          <div className="w-80 h-80">
            {pedidos && <Pie data={generateChartData(pedidos)} />}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h5 className="mb-4 text-base font-medium text-black dark:text-white">
            Comida Más Solicitada
          </h5>
          <div className="w-80 h-80">
            {comidas && <Pie data={generateChartData(comidas)} />}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h5 className="mb-4 text-base font-medium text-black dark:text-white">
            Accidentes por Mes
          </h5>
          <div className="w-80 h-80">
            {accidentes && <Pie data={generateChartData(accidentes)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOne;





