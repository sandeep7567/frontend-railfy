import React, { useState } from "react";
import AppNavbar from "../AppNavbar";
import AppSidebar from "../AppSidebar";

const LayoutHOC = (ChildComponent: React.ComponentType) => {
  const LayoutWrapper = (props: any) => {
    const [mobileNavView, setMobileNavView] = useState(false);
    
    return (
      <>
        <main className="relative flex" >
          {/* Sidebar */}
          <AppSidebar mobileView={mobileNavView} setMobileView={setMobileNavView} />

          <div className="grow">
            {/* AppBar */}
            <AppNavbar mobileView={mobileNavView}  />

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
