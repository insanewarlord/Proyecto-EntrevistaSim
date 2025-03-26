import PropTypes from "prop-types";

const RecomendacionesIA = ({ recomendaciones }) => {
  // Acceder a la estructura anidada correctamente
  const recomendacionesIA =
    recomendaciones?.recomendaciones?.recommendations || [];

  console.log("RecomendacionesIA:", recomendacionesIA);

  if (recomendacionesIA.length === 0) {
    return (
      <div className="flex  items-center justify-center h-full p-6  rounded-lg shadow-lg space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>

        <p className="text-lg font-semibold text-gray-800">
          No hay recomendaciones disponible todavía
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-6  rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recomendaciones</h2>
      <ul className="space-y-4">
        {recomendacionesIA.map((recomendacion, index) => (
          <li
            key={index}
            className="p-4 bg-white rounded-lg shadow-md border-4 border-purple-500"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {recomendacion.question}
            </h3>
            <p className="text-gray-600">{recomendacion.recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

RecomendacionesIA.propTypes = {
  recomendaciones: PropTypes.shape({
    recomendaciones: PropTypes.shape({
      recommendations: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          recommendation: PropTypes.string.isRequired,
        })
      ),
    }),
  }),
};

RecomendacionesIA.defaultProps = {
  recomendaciones: { recomendaciones: { recommendations: [] } },
};

export default RecomendacionesIA;
