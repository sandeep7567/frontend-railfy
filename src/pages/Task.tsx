import TaskFormTemplate from "@/components/form/TaskFormTemplate";
import LayoutHOC from "@/components/layout/LayoutHOC";
import { WrapperLayout } from "@/components/layout/WrapperLayout";
import { DetailTaskCard } from "@/components/task/DetailTaskCard";
import { TaskListing } from "@/pages/TaskListing";
import { RootState } from "@/redux/store";
import { TaskFormType } from "@/types";
import moment from "moment";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";

const Task = () => {
  const { id } = useParams();
  const location = useLocation();
  const edit = location.pathname.includes("edit") ? "edit" : undefined;
  const { data: taskData, pageInfo } = useSelector(
    (state: RootState) => state.task
  );

  // 01 formmated data to show task listing on main page
  const formmatedTask: TaskFormType[] = taskData.map((taskData: any) => {
    return {
      ...taskData,
      maintainceDate: moment(taskData.maintainceDate).format("DD-MM-YYYY"),
      dueDate: moment(taskData.dueDate).format("DD-MM-YYYY"),
    };
  });

  // 02 filtered task by id and formmated to get data for utilize to update and view compoent
  const findTaskById = taskData.filter((task: any) => task._id === id);

  const formmatedTaskById: TaskFormType[] = findTaskById.map((taskData: any) => {
    return {
      ...taskData,
      maintainceDate: moment(taskData.maintainceDate).format("DD-MM-YYYY"),
      dueDate: moment(taskData.dueDate).format("DD-MM-YYYY"),
    };
  });

  const taskById =
    formmatedTaskById && formmatedTaskById.length > 0 && formmatedTaskById[0];

  if (location.pathname.includes("/edit") && id === "new") {
    return <Navigate to={"/task"} replace />;
  };

  // 01 View detail task card by taskId;
  if (
    id &&
    id !== "new" &&
    // taskById &&
    !location.pathname.includes("edit")
  ) {
    return (
      <WrapperLayout>
        {taskById && <DetailTaskCard {...taskById} />}
      </WrapperLayout>
    );
  }

  // 02 All task card listing
  if (
    taskData.length >= 0 &&
    id !== "new" &&
    !location.pathname.includes("edit")
  ) {
    return (
      <TaskListing task={formmatedTask} pageInfo={pageInfo} />
    )
  }

  // 03 New create task form;
  if (id === "new" && !location.pathname.includes("edit")) {
    return <TaskFormTemplate mode={id} />;
  }

  // 04 Edit task form
  if (
    id &&
    id !== "new" &&
    id !== undefined &&
    formmatedTask.length > 0 &&
    location.pathname.includes("edit")
  ) {
    return <TaskFormTemplate task={formmatedTask} mode={edit} />;
  }
};

export default LayoutHOC(Task);
