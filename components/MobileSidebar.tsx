//@ts-nocheck
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  let sidebar: SidebarComponent;

  const toggleSidebar = () => {
    sidebar.toggle();
  };
  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to={"/"} className="">
          {" "}
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Tourvisto</h1>
        </Link>
        <button className="" onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
        <SidebarComponent
          width={270}
          enableGestures={false}
          ref={(Sidebar) => (sidebar = Sidebar)}
          created={() => sidebar.hide()}
          closeOnDocumentClick={true}
          showBackdrop={true}
          type="over"
        >
          <NavItems toggleClick={toggleSidebar} />
        </SidebarComponent>
      </header>
    </div>
  );
};

export default MobileSidebar;
