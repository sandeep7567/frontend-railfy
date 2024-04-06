import {
  CalendarDays,
  ChevronDownIcon,
  Edit,
  Eye,
  History,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import { TaskFormType } from "@/types";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "./ui/Separator";

import { DeleteTaskByIdMoadl } from "./ui/modal/DeleteTaskById";

export const TaskCard: React.FC<TaskFormType> = ({
  _id,
  title,
  maintainceDate,
  dueDate,
}) => {
  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteById = async () => {
    _id && setDeleteId(_id);
  };

  return (
    <Card>
      {/* show delete dialog here; */}
      {deleteId && (
        <DeleteTaskByIdMoadl
          title={`Are you sure you want to delete this Task: ${title}`}
          deleteId={deleteId}
          type="deleteTaskById"
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
        />
      )}
      <CardHeader className="flex flex-row justify-between items-center gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
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
                <DropdownMenuItem asChild>
                  <Link to={`/task/${_id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/task/${_id}/edit`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Update</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteById}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
                <Separator />
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
          {dueDate && (
            <div className="flex items-center">
              <CalendarDays className="mr-1 h-3 w-3 text-sky-400" />
              Due: {dueDate}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
