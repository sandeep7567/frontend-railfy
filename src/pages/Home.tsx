import LayoutHOC from "@/components/layout/LayoutHOC";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { RootState } from "@/redux/store";
import {
  PlusCircleIcon,
  X
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import moment from "moment";

const Home = () => {
  const navigate = useNavigate();
  const { data: taskData } = useSelector((state: RootState) => state.task);

  const formmatedTask = taskData.map((taskData: any) => {
    return {
      ...taskData,
      description: `${taskData.description.split(" ").slice(0, 6).join(" ")}...` || "",
      maintainceDate: moment(taskData.maintainceDate).format("DD-MM-YYYY"),
      dueDate: taskData.dueDate
        ? moment(taskData.dueDate).format("DD-MM-YYYY")
        : undefined,
    };
  });

  return (
    <div className="w-10/12 mx-auto ml-16 lg:ml-24 xl:ml-24 2xl:ml-56 mt-16">
      {/* if data is not empty */}
      {formmatedTask && formmatedTask.length > 0 && (
        <>
          <Card className="flex gap-4 shadow-none bg-none w-fit ml-auto justify-end items-center mb-2">
            <Button
              variant={"ternary"}
              className="bg-blue-500 w-fit mx-auto hover:bg-blue-500/90 text-white"
              asChild
            >
              <Link to={"/task/new"}>
                <PlusCircleIcon className="mr-2 h-5 w-5" /> Create Task
              </Link>
            </Button>
            <Button>
              <X className="mr-2 h-5 w-5" /> Clear All
            </Button>
          </Card>
          {/* TODO Task Listing */}
          <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4 my-10">
            {formmatedTask.map((task: any) => (
              <TaskCard key={task._id} {...task} />
            ))}
          </div>
        </>
      )}

      {/* if data is empty */}
      {formmatedTask && formmatedTask.length === 0 && (
        <Card className="w-full mx-auto h-[43rem] bg-[#f5f5f5] flex justify-center items-center">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="text-4xl text-purple-700">
              No Task Found
            </CardTitle>
            <Button
              onClick={() => navigate("/task/new")}
              variant={"secondary"}
              size={"default"}
              className="bg-blue-500 w-fit mx-auto hover:bg-blue-500/90 text-white"
            >
              <PlusCircleIcon className="mr-2 h-5 w-5" /> Create your first Task
            </Button>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default LayoutHOC(Home);
