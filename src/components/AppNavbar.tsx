import { cn } from "@/lib/utils";
import { AppSidebarProps } from "@/types";
import { CircleUserRound, Search } from "lucide-react";
import { Link } from "react-router-dom";

const AppNavbar: React.FC<AppSidebarProps> = ({ mobileView }) => {
  return (
    <nav
      className={cn(
        "fixed h-10 inset-0 max-w-full",
        mobileView
          ? "left-52 xl:left-52 2xl:left-52 transition-all duration-300"
          : "left-12 xl:left-12 2xl:left-12 transition-all duration-300"
      )}
    >
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between h-10 lg:h-10">
            <div className="flex lg:items-center lg:space-x-10">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search className="w-4 h-4 cursor-pointer text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              <Link
                to={"/"}
                title=""
                className="flex items-center justify-center w-8 h-8 text-white bg-slate-800 rounded-full"
              >
                <CircleUserRound className="w-6 h-6" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
