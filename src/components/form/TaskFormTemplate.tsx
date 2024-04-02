import { PropsWithChildren } from "react";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import TaskForm from "./TaskForm";

const TaskFormTemplate = ({ mode }: { mode: "new" | "edit" | undefined }) => {
  if (mode === "new") {
    return (
      <TaskController>
        <TaskForm mode={mode} />
      </TaskController>
    );
  } else if (mode === "edit") {
    return (
      <TaskController>
        <TaskForm mode={mode} />
      </TaskController>
    );
  } else {
    return (
      <TaskController>
        <h1>View Task Details</h1>
      </TaskController>
    );
  }
};

export default TaskFormTemplate;

export const TaskController = ({ children }: PropsWithChildren) => {
  return (
    <Card className="w-full mx-auto mt-10 pb-10 bg-[#f5f5f5] flex flex-col justify-center items-center">
      <CardHeader className="flex flex-col gap-5">
        <CardTitle className="text-4xl text-purple-700">
          No Task Found
        </CardTitle>
      </CardHeader>
      {/* Form Component to create new task */}
      {children}
    </Card>
  );
};
