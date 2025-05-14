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
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

function EstadisticasLaborales() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const DatosInfo = await mostrarInfoRequest();
        console.log("Respuesta completa de la API:", DatosInfo);

        // Extraer los datos de la respuesta
        const respuesta = DatosInfo.data || [];
        console.log("Datos obtenidos del backend:", respuesta);

        // Formatear los datos obtenidos
        const formattedData = respuesta.data.map((item, index) => ({
          id: `${item.country}-${index}`,
          country: item.country || "Desconocido",
          totalInterviews: item.totalInterviews || 0,
        }));

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

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-gray-500 text-lg">
          No hay datos disponibles para mostrar.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full w-full overflow-hidden rounded-lg">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <h1 className="text-lg font-bold m-3 text-gray-400">
          {t('laboral_stats_title', language).replace('{{year}}', new Date().getFullYear())}
        </h1>
        <div className="p-1 flex items-center justify-center h-full w-full m-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
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
