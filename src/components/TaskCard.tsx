import {
  CalendarDays,
  ChevronDownIcon,
  Edit,
  Eye,
  History,
  Timer,
  Trash
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";

import { TaskFormType } from "@/types";
import React from "react";
import { Separator } from "./ui/Separator";
import { useNavigate } from "react-router-dom";

export const TaskCard: React.FC<TaskFormType> = ({
  _id,
  title,
  description,
  maintainceDate,
  dueDate = "",
  days,
}) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary w-fit text-secondary-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size={"icon"}
                className="px-2 shadow-none"
              >
                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={0}
              className="w-full"
              forceMount
            >
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/task/${_id}/edit`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Update</span>
                  
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                  
                </DropdownMenuItem>
                <Separator/>
                <DropdownMenuItem>
                  <History className="mr-2 h-4 w-4" />
                  <span>History</span>
                  
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="mr-1 h-3 w-3 text-sky-400" />
            Maintaince: {maintainceDate}
          </div>
          {dueDate.length > 0 && (
            <div className="flex items-center">
              <CalendarDays className="mr-1 h-3 w-3 text-sky-400" />
              Due: {dueDate}
            </div>
          )}
          {/* <div className="flex items-center text-xs sm:text-sm">
            <Timer className="mr-1 h-3 w-3 text-sky-400" />
            {days} days left
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};
