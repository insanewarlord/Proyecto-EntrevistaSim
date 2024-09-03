import MenuTeacher from "../components/MenuTeacher";
import CreateInterview from "../components/createInterview";
import NavbarTeacher from "../components/NavbarTeacher";

export default function AreaTeachert() {
  return (
    <>
      <div className="p-5 h-screen flex flex-col overflow-hidden">
        <div className="flex my-5 space-x-5 flex-grow overflow-hidden">
          <div className="w-1/3 flex flex-col h-full overflow-hidden">
            <MenuTeacher />
          </div>
          <div className="w-3/4 flex flex-col space-y-5 h-full overflow-hidden">
            <NavbarTeacher />
            <CreateInterview />
          </div>
        </div>
      </div>
    </>
  );
}
