import { Card, CardHeader, CardTitle } from "../ui/Card";
import TaskForm from "./TaskForm";

const TaskFormTemplate = ({
  mode,
  task,
}: {
  mode: "new" | "edit" | undefined;
  task?: any;
}) => {
  if (mode === "new") {
    return (
      <TaskController title="Create New Task">
        <TaskForm mode={mode} task={task} />
      </TaskController>
    );
  }
  if (mode === "edit") {
    return (
      <TaskController title="Edit Task">
        <TaskForm mode={mode} task={task} />
      </TaskController>
    );
  }
};

export default TaskFormTemplate;

export const TaskController = ({
  children,
  title = "Create New Task",
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <Card className="w-[80%] ml-[4.5rem] md:ml-28 xl:ml-56 mt-12 pb-10 bg-card flex flex-col justify-center items-center">
      <CardHeader className="flex flex-col gap-5">
        <CardTitle className="text-4xl font-semibold text-indigo-600">
          {title}
        </CardTitle>
      </CardHeader>
      {/* Form Component to create new task */}
      {children}
    </Card>
  );
};
