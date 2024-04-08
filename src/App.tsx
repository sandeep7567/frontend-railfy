import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const Loader = lazy(() => import("@/components/ui/Loader"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const TaskPage = lazy(() => import("@/pages/TaskPage"));

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      window.location.href = "/task";
    }
  }, [location]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Task Routes */}
          <Route path="/task" element={<TaskPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/task/:id/edit" element={<TaskPage />} />
          {/* History Routes */}
          <Route path="/history" element={<TaskPage />} />
          <Route path="/history/:id" element={<TaskPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
