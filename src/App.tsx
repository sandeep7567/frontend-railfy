import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const Loader = lazy(() => import("@/components/ui/Loader"));
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Task = lazy(() => import("@/pages/Task"));

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      window.location.href = "/home";
    }
  }, [location]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* Task Routes */}
          <Route path="/task/:id/edit" element={<Task />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/task" element={<Task />} />
          {/* History Routes */}
          <Route path="/history" element={<Task />} />
          <Route path="/history/:id" element={<Task />} />
          <Route path="*" element={<NotFound />} />{" "}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
