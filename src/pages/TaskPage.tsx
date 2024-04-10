import TaskFormTemplate from "@/components/form/TaskFormTemplate";
import LayoutHOC from "@/components/layout/LayoutHOC";
import { WrapperLayout } from "@/components/layout/WrapperLayout";
import { DetailTaskCard } from "@/components/task/DetailTaskCard";
import { formattedDate, isValidObjectId } from "@/lib/utils";
import { TodoListing } from "@/pages/TodoListing";

import { useGetTaskQuery } from "@/redux/api/apiSlice";
import { RootState } from "@/redux/store";

import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { QUERY } from "@/constant/constant";

const TaskPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const mode =
    id !== "new" && location.pathname.includes(`/task/${id}/edit`)
      ? "edit"
      : id !== "new" && location.pathname.includes(`/task/${id}`)
      ? "view"
      : "new";

  const isValidId = isValidObjectId(id as string);

  const [pagination, setPagination] = useState({
    pageIndex: QUERY.PAGE_INDEX,
    pageSize: QUERY.PAGE_SIZE,
  });

  const [sort, setSort] = useState({
    field: QUERY.SORT_FIELD.DUE_DATE,
    order: QUERY.SORT_ORDER.ASC,
  });
  
  const {
    isFetching,
    isLoading,
    isError: isGetTaskError,
  } = useGetTaskQuery(
    {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      field: sort.field,
      order: sort.order,
    },
    { refetchOnMountOrArgChange: true }
  );

  // Extracts task data and pageInfo from the Redux store
  const { data: taskData, pageInfo } = useSelector(
    (state: RootState) => state.task
  );

  // Render the task creation form if the route indicates a new task creation
  if (id && id === "new" && mode === "new") {
    return <TaskFormTemplate mode={"new"} />;
  }

  // const formmatedTaskData =
  const formmatedTaskListing =
    taskData && mode === "edit"
      ? taskData.map((task: any) => ({
          ...task,
          maintainceDate:
            task.maintainceDate &&
            formattedDate(
              task.maintainceDate.split("T")[0].split("-").reverse().join("-")
            ),
        }))
      : taskData.map((task: any) => ({
          ...task,
          maintainceDate: moment(task.maintainceDate).format("DD-MM-YYYY"),
          dueDate: moment(task.dueDate).format("DD-MM-YYYY"),
        }));

  // Format and find the task by ID to display detailed task information
  const findTaskById =
    formmatedTaskListing &&
    formmatedTaskListing.filter((task: any) => task._id === id)[0];

  if (!isValidId || isGetTaskError) {
    return <NotFound />;
  }

  // Render the detailed task card if a task ID is specified and not in 'edit' mode
  if (mode === "view") {
    return (
      <WrapperLayout>
        <DetailTaskCard {...findTaskById} />
      </WrapperLayout>
    );
  }

  // Render the task listing if there are tasks and we're not creating or editing a task
  if (taskData.length >= 0 && mode === "new") {
    return (
      <TodoListing
        isFetching={isFetching}
        isLoading={isLoading}
        task={formmatedTaskListing}
        pageInfo={pageInfo}
        setPagination={setPagination}
        pagination={pagination}
        setSort={setSort}
      />
    );
  }

  // Render the task editing form if a task ID is specified and in 'edit' mode
  if (mode === "edit") {
    return <TaskFormTemplate task={findTaskById} mode={"edit"} />;
  }
};

export default LayoutHOC(TaskPage);
