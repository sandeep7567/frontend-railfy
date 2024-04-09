import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import routes, { RouteConfig } from "@/routes/RouteConfig";
import Loader from "@/components/ui/Loader"; // Assuming Loader is a default export

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      window.location.href = "/task";
    }
  }, []);
  
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route: RouteConfig, index: number) => (
          <Route key={index} index={route.path === "/task"} path={route.path} element={<route.component />} />
        ))}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
