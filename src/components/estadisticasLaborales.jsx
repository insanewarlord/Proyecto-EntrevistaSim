import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Gerente de TI", empleos: 169.51 },
  { name: "D. software", empleos: 130.16 },
  { name: "A. redes informaticas", empleos: 129.84 },
  { name: "Ingeniero de IA", empleos: 161.286 },
  { name: "I de sitios", empleos: 141.257 },
];
function estadisticasLaborales() {
  return (
    <div className="flex items-center justify-center border-4 h-full w-full overflow-hidden rounded-lg">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <h1 className="text-lg font-bold m-3 text-gray-400">
          Empleos en el sector de TI en el 2024
        </h1>
        <div className="p-1 flex items-center justify-center h-full w-full m-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={0}
                textAnchor="middle"
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="empleos"
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

export default estadisticasLaborales;
