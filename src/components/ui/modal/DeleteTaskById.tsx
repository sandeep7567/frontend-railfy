import {
  useDeleteAllTaskMutation,
  useDeleteTaskByIdMutation,
} from "@/redux/api/taskSlice";
import { Button } from "@/components/ui/Button";
import { DeleteModalProps } from "@/types";

export const DeleteTaskByIdMoadl = ({
  deleteId = null,
  title,
  type,
  isOpen,
  onClose
}: DeleteModalProps) => {
  const [deleteTaskByIdApi, {}] = useDeleteTaskByIdMutation();
  const [deleteAllTaskApi] = useDeleteAllTaskMutation();

  const handleDeleteById = async () => {
    switch (type) {
      case "deleteTask":
        await deleteAllTaskApi();
        break;
      case "deleteHistory":
        console.log("deleteAllHistoryApi()");
        break;
      case "deleteTaskById":
        deleteId && await deleteTaskByIdApi(deleteId);
      break;
      case "deleteHistoryById":
        deleteId && console.log("deleteHistoryById()");
      break;
    
      default:
        break;
    }

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (isOpen) {
    return (
      <div
        id="popup-modal"
        tabIndex={-1}
        className="overflow-y-hidden overflow-x-hidden fixed inset-0 justify-center bg-card-foreground/60 items-center"
      >
        <div className="absolute sm:translate-x-1/2 sm:translate-y-full lg:translate-x-[125%] lg:translate-y-full top-0 left-0 translate-x-[8%] translate-y-[100%]">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={handleCancel}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {title}?
                </h3>
                <Button
                  data-modal-hide="popup-modal"
                  type="button"
                  variant={"destructive"}
                  onClick={handleDeleteById}
                  className="mr-4"
                >
                  Yes, I'm sure
                </Button>
                <Button
                  data-modal-hide="popup-modal"
                  type="button"
                  variant={"outline"}
                  onClick={handleCancel}
                  // className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
