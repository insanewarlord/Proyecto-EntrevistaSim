import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mostrarInfoRequest } from "../api/interview";

function EstadisticasLaborales() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const DatosInfo = await mostrarInfoRequest();
        const respuesta = DatosInfo.data.info.data || [];
        console.log("Datos obtenidos:", respuesta);

        // Formatear los datos obtenidos
        const formattedData = respuesta.map((item) => {
          // Verificar si totalInterviews es una cadena antes de eliminar las comas y convertirla a número
          const totalInterviews =
            typeof item.totalInterviews === "string"
              ? Number(item.totalInterviews.replace(/,/g, ""))
              : Number(item.totalInterviews);
          return {
            country: item.country,
            totalInterviews: isNaN(totalInterviews) ? 0 : totalInterviews,
          };
        });

        console.log("Datos formateados:", formattedData);
        setData(formattedData);
      } catch (error) {
        console.log("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full relative">
        <div role="status" className="flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="w-28 h-28 animate-spin"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00bfff" />
                <stop offset="50%" stopColor="#ff69b4" />
                <stop offset="100%" stopColor="#32cd32" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset="75"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full w-full overflow-hidden rounded-lg">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <h1 className="text-lg font-bold m-3 text-gray-400">
          Estadísticas de entrevistas técnicas en el 2024
        </h1>
        <div className="p-1 flex items-center justify-center h-full w-full m-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data} // Utiliza los datos obtenidos de la API
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="country"
                tick={{ fontSize: 12 }}
                angle={0}
                textAnchor="middle"
                interval={0}
              />
              <YAxis
                label={{
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar
                dataKey="totalInterviews" // El eje Y muestra el total de entrevistas
                fill="rgba(136, 84, 216, 0.5)"
                stroke="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default EstadisticasLaborales;
