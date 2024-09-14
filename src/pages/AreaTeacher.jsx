import MenuTeacher from "../components/MenuTeacher";
import NavbarTeacher from "../components/NavbarTeacher";
import CreateInterview from "../components/createInterview";
import ViewInterview from "../components/viewInterview";
import { useState } from "react";

export default function AreaTeacher() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("create");
  const renderSelectedComponent = () => {
    switch (selectedMenuItem) {
      case "create":
        return <CreateInterview />;
      case "view":
        return <ViewInterview />;
      default:
        return <CreateInterview />;
    }
  };

  return (
    <>
      <div className="p-5 h-screen flex flex-col overflow-hidden">
        <div className="flex flex-col lg:flex-row my-5 space-y-5 lg:space-y-0 lg:space-x-5 flex-grow overflow-hidden">
          <div className="order-2 lg:order-1 w-full lg:w-1/3 flex flex-col h-full overflow-hidden mt-5 lg:mt-0">
            <MenuTeacher onMenuItemChange={setSelectedMenuItem} />
          </div>
          <div className="order-1 lg:order-2 w-full lg:w-3/4 flex flex-col space-y-5 h-full overflow-hidden">
            <NavbarTeacher />
            <div className="flex flex-col h-full overflow-hidden">
              {renderSelectedComponent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
