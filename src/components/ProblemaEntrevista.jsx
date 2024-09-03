import PropTypes from "prop-types";

function ProblemaEntrevista({ IAresult, nombre, dificultad }) {
  return (
    <>
      <div className="h-full w-full bg-gradient-to-t from-orange-300 via-pink-300 to-purple-300 rounded-lg border-4 overflow-hidden">
        <div className="flex flex-col w-full h-full p-5 overflow-y-auto">
          <div className="flex flex-col bg-white rounded-lg  p-4 h-auto space-y-10 my-auto">
            <div className="flex w-full items-center justify-between ">
              <h2 className="text-lg font-bold">{nombre}</h2>
              <p className="text-gray-500">Dificultad: {dificultad}</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-justify">{IAresult}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProblemaEntrevista;

ProblemaEntrevista.propTypes = {
  IAresult: PropTypes.string,
  nombre: PropTypes.string,
  dificultad: PropTypes.string,
};
