import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useFetch from "../hooks/useFetch";

const API_PARA_GRAFICOS = import.meta.env.VITE_POSTMAN_LOGIN_USER;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ChartData {
  name: string; // aquí asumimos que name es la fecha o periodo
  value: number;
}

const TableThree = () => {
  const { data: pedidos, loading: loading1 } = useFetch<ChartData[]>(
    API_PARA_GRAFICOS + "/PedidosPorRestaurante"
  );
  const { data: comidas, loading: loading2 } = useFetch<ChartData[]>(
    API_PARA_GRAFICOS + "/ComidaMasSolicitada"
  );
  const { data: accidentes, loading: loading3 } = useFetch<ChartData[]>(
    API_PARA_GRAFICOS + "/AccidentesPorMes"
  );

  const generateChartData = (data: ChartData[], label: string) => ({
    labels: data.map((item) => item.name),
    datasets: [
      {
        label,
        data: data.map((item) => item.value),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        tension: 0.3, // suaviza la línea
        pointRadius: 4,
      },
    ],
  });

  if (loading1 || loading2 || loading3) return <p>Cargando datos...</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
      <h4 className="text-xl font-semibold text-black dark:text-white mb-6">
        Series Temporales
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <h5 className="mb-4 text-base font-medium text-black dark:text-white">
            Pedidos por Restaurante (Temporal)
          </h5>
          <div className="w-80 h-80">
            {pedidos && <Line data={generateChartData(pedidos, "Pedidos")} />}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h5 className="mb-4 text-base font-medium text-black dark:text-white">
            Comida Más Solicitada (Temporal)
          </h5>
          <div className="w-80 h-80">
            {comidas && <Line data={generateChartData(comidas, "Comida")} />}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h5 className="mb-4 text-base font-medium text-black dark:text-white">
            Accidentes por Mes (Temporal)
          </h5>
          <div className="w-80 h-80">
            {accidentes && <Line data={generateChartData(accidentes, "Accidentes")} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableThree;



