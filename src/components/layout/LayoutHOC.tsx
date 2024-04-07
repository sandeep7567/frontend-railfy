import AppNavbar from "../AppNavbar";
import AppSidebar from "../AppSidebar";
import { useWindowSize } from "@/hooks/useWindowSize";

const LayoutHOC = (ChildComponent: React.ComponentType) => {
  const LayoutWrapper = (props: any) => {

    // use useWindowSize hook;
    const { mobileNavView, setMobileNavView } = useWindowSize();

    return (
      <>
        <main className="relative flex">
          {/* Sidebar */}
          <AppSidebar
            mobileView={mobileNavView}
            setMobileView={setMobileNavView}
          />

          <div className="grow">
            {/* AppBar */}
            <AppNavbar mobileView={mobileNavView} />

            {/* Main Dashboard Area */}
            <ChildComponent {...props} />
          </div>
        </main>
      </>
    );
  };

  return LayoutWrapper;
};

export default LayoutHOC;
