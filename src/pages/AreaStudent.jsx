import Navbar from "../components/Navbar";
import PanelInterviews from "../components/Interviews";
import Tips from "../components/tips";
import EstadisticasLaborales from "../components/estadisticasLaborales";

export default function AreaStudent() {
  return (
    <>
      <div className="p-5 h-screen flex flex-col overflow-hidden bg-[#cbe2fe] dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <Navbar />
        <div className="flex flex-col lg:flex-row my-5 space-y-5 lg:space-y-0 lg:space-x-5 flex-grow overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden bg-white bg-opacity-95 rounded-xl shadow-lg border-2 border-[#ffd700]" style={{boxShadow: '0 4px 16px 0 rgba(40,62,86,0.15)'}}>
            <PanelInterviews />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden bg-white bg-opacity-95 rounded-xl shadow-lg border-2 border-[#ffd700]" style={{boxShadow: '0 4px 16px 0 rgba(40,62,86,0.10)'}}>
            <div className="flex flex-col w-full h-1/2 justify-start">
              <Tips />
            </div>
            <div className="flex flex-col w-full h-1/2 justify-end">
              <EstadisticasLaborales />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
