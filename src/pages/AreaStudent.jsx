import Navbar from "../components/Navbar";
import PanelInterviews from "../components/Interviews";
import Tips from "../components/tips";
import EstadisticasLaborales from "../components/estadisticasLaborales";

export default function AreaStudent() {
  return (
    <>
      <div className="p-5 h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-col lg:flex-row my-5 space-y-5 lg:space-y-0 lg:space-x-5 flex-grow overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden">
            <PanelInterviews />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col space-y-5 h-full overflow-hidden">
            <Tips />
            <EstadisticasLaborales />
          </div>
        </div>
      </div>
    </>
  );
}
