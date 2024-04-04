import TaskFormTemplate from "@/components/form/TaskFormTemplate";
import LayoutHOC from "@/components/layout/LayoutHOC";
import { Navigate, useLocation, useParams } from "react-router-dom";

const Task = () => {
  const { id } = useParams();
  const location = useLocation();
  const edit = location.pathname.includes("edit") ? "edit" : undefined;

  if (id === undefined && !location.pathname.includes("edit")) {
    return <Navigate to="/home" />;
  }

  if (id === "new") {
    return <TaskFormTemplate mode={id} />;
  }

  if (
    id &&
    id !== "new" &&
    id !== undefined &&
    !location.pathname.includes("edit")
  ) {
    return <div>Task View Details</div>;
  }

  if (
    id &&
    id !== "new" &&
    id !== undefined &&
    location.pathname.includes("edit")
  ) {
    return <TaskFormTemplate mode={edit} />;
  }
};

export default LayoutHOC(Task);
