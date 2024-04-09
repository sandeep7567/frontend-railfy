import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";
import { TaskFormType } from "@/types";
import { ChevronLeft, ChevronRight, PlusCircleIcon, X } from "lucide-react";
import { DeleteTaskByIdMoadl } from "@/components/ui/modal/DeleteModal";
import { DetailTaskCard } from "@/components/task/DetailTaskCard";
import { cn } from "@/lib/utils";

interface PageInfoProps {
  totalDoc: number;
  totalPages: number;
  currentPage: number;
}

interface TodoListingProps {
  task: any[];
  pageInfo: PageInfoProps;
  isHistory?: boolean;
  isFetching: boolean;
  isLoading: boolean;
  pagination: { pageIndex: number; pageSize: number };
  sort?: { field: string; order: "asc" | "dsc" };
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  setSort: (sort: { field: string; order: "asc" | "dsc" }) => void;
}

export const TodoListing = ({
  task = [],
  pageInfo,
  isHistory = false,
  isFetching = false,
  isLoading = false,
  setPagination,
  pagination,
}: TodoListingProps) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // formatting data as Type
  const currentPage = pageInfo?.currentPage;
  const totalDoc = pageInfo.totalDoc;
  const totalPages = pageInfo.totalPages;

  const { id } = useParams();

  const handleDeleteDB = async () => {
    setIsOpen(true);
  };

  const handleNextPage = () => {
    setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 });
    setPagination({
      ...pagination,
      pageIndex: Math.max(pagination.pageIndex + 1, 0),
    });
  };

  const handlePrevPage = () => {
    setPagination({
      ...pagination,
      pageIndex: Math.max(pagination.pageIndex - 1, 0),
    });
  };

  if (isLoading) {
    return <Loader />;
  };

  return (
    <div className="w-10/12 mx-auto ml-16 lg:ml-24 xl:ml-24 2xl:ml-56 mt-8 md:mt-16">
      {/* Show clear all task Modal */}
      {isOpen && (
        <DeleteTaskByIdMoadl
          title={"Are you sure you want to delete All Task Listing?"}
          type={isHistory ? "deleteHistory" : "deleteTask"}
          isOpen={isOpen}
          deleteId={isHistory ? id : null}
          onClose={() => setIsOpen(false)}
        />
      )}
      {/* if data is not empty */}
      {task && task.length > 0 && (
        <div className="flex flex-col-reverse md:flex-col">
          <Card className="w-full md:w-fit border-none flex flex-col sm:flex-row gap-4 shadow-none bg-none ml-auto justify-end items-center mb-2">
            <Button
              variant={"ternary"}
              className="bg-blue-500 w-full md:w-fit mx-auto hover:bg-blue-500/90 text-white"
              asChild
            >
              <Link to={"/task/new"}>
                <PlusCircleIcon className="mr-2 h-5 w-5" /> Create Task
              </Link>
            </Button>
            <Button onClick={handleDeleteDB} className="w-full md:w-fit">
              <X className="mr-2 h-5 w-5" /> Clear All
            </Button>
          </Card>
          {/* TODO Task Listing */}
          <div className="flex flex-col justify-between min-h-[35rem] h-full">
            <div
              className={cn(
                "w-full md:w-3/4 lg:w-10/12 xl:w-full pr-2 md:p-0 ml-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4 my-10",
                isHistory && "xl:grid-cols-1 2xl:grid-cols-1"
              )}
            >
              {!!task.length &&
                task.map((task: TaskFormType) =>
                  isHistory ? (
                    <DetailTaskCard
                      isHistory={isHistory}
                      task={task}
                      key={task._id}
                    />
                  ) : (
                    <TaskCard isHistory={isHistory} key={task._id} {...task} />
                  )
                )}
            </div>
            <Card className="w-full md:w-full mx-auto border-none gap-32 flex flex-row shadow-none bg-none justify-end items-center mb-10 md:mb-2">
              {/* total no of docs show */}
              <div className="text-xs lg:text-sm text-muted-foreground">
                Total Docs:{" "}
                <span className="text-accent-foreground font-bold">
                  {totalDoc}
                </span>
              </div>
              <div className="flex justify-end items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={pagination.pageIndex === 0 || isFetching}
                  onClick={handlePrevPage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  {currentPage}/{totalPages}
                </div>
                {/* TODO pagination.pageIndex + 1 === totalPages */}
                <Button
                  variant="outline"
                  size="icon"
                  disabled={
                    pagination.pageIndex + 1 === totalPages || isFetching
                  }
                  onClick={handleNextPage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* if data is empty */}
      {task && task.length === 0 && (
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
