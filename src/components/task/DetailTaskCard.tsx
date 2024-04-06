import { ChevronLeft, Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { TaskFormType } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const DetailTaskCard: React.FC<TaskFormType> = ({
  _id,
  title,
  description,
  maintainceDate,
  dueDate,
  days,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof _id === "undefined") {
      navigate("/task");
    }
  }, []);

  return (
    <Card className="bg-secondary/80 justify-center items-center ">
      <CardHeader className="flex flex-row justify-between space-y-0 items-center">
        <CardTitle className="text-xl lg:text-2xl">{title}</CardTitle>
        <div className="gap-2 flex">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-muted-foreground/10 hover:text-accent-foreground/90"
            asChild
          >
            <Link to={`/task/${_id}/edit`}>
              <Edit className="w-3.5 h-3.5" />
            </Link>
          </Button>
          <Button variant={"destructive"} size={"icon"}>
            <Trash className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardHeader>

      {description && (
        <CardContent className="border-t p-6 flex flex-col gap-4">
          <CardTitle className="text-xl lg:text-2xl">Description</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      )}

      <CardFooter className="flex flex-col lg:flex-row items-start justify-between lg:items-center flex-wrap gap-4 w-full border-t p-6">
        <div className="text-xs lg:text-sm text-muted-foreground">
          <span className="text-accent-foreground">Maintaince Date: </span>
          {maintainceDate}
        </div>
        <div className="text-xs lg:text-sm text-muted-foreground">
          <span className="text-accent-foreground">Expire In: </span> {days}{" "}
          days
        </div>
        <div className="text-xs lg:text-sm text-muted-foreground">
          <span className="text-accent-foreground">Due Date: </span> {dueDate}
        </div>
        <Button
          size={"default"}
          variant={"ghost"}
          className="hover:bg-muted-foreground/10 hover:text-accent-foreground/90 w-full lg:w-fit"
          asChild
        >
          <Link to={"/task"}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
