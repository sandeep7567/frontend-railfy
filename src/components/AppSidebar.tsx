import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Hash,
  History,
  ListTodo,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { AppSidebarProps, NavDataType } from "@/types";
import React from "react";

const AppSidebar: React.FC<AppSidebarProps> = ({
  setMobileView,
  mobileView,
}) => {
  const location = useLocation();

  const setMobileViewButton = () => {
    setMobileView && setMobileView((prev) => !prev);
  };

  const navData: NavDataType[] = [
    {
      name: "Task",
      href: "/task",
      icon: ListTodo,
      path: location.pathname.includes("/task"),
    },
    {
      name: "History",
      href: "/history",
      icon: History,
      path: location.pathname.includes("/history"),
    },
  ];

  return (
    <aside
      className={cn(
        "bg-secondary min-h-screen fixed inset-0 top-0 z-0 left-0 h-full",
        mobileView ? "w-52 xl:w-52 2xl:w-52 transition-all duration-500" : "w-12 xl:w-12 2xl:w-12 transition-all duration-500"
      )}
    >
      <div className="flex flex-col justify-between h-full ">
        <Link
          to={"/task"}
          className="bg-[#181c2e] text-lg text-[#f0f0f0] w-full h-10 px-3 py-2 flex gap-1"
        >
          <Hash className="w-5 h-full flex justify-center items-center" />
          <p
            className={cn(
              "",
              mobileView ? "block xl:block 2xl:block" : "hidden xl:hidden 2xl:hidden"
            )}
          >
            Railfy
          </p>
        </Link>
        <div className="bg-[#21263c] text-[#f0f0f0] px-2 py-6 w-full grow flex flex-col gap-5">
          {navData.map((navItem: NavDataType, i: number) => {
            const { href, icon: Icon, name, path } = navItem;
            return (
              <Link
                to={href}
                key={i}
                className={cn(
                  "rounded-lg",
                  path ? "bg-blue-500" : "hover:bg-[#181c2e]"
                )}
              >
                <div
                  className={cn(
                    "flex gap-1 justify-start rounded-lg transition-all p-2 duration-200 cursor-pointer"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <p
                    className={cn(
                      "text-sm",
                      mobileView ? "block xl:block 2xl:block" : "hidden xl:hidden 2xl:hidden"
                    )}
                  >
                    {name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <Button className="w-full rounded-none" onClick={setMobileViewButton}>
          {mobileView ? (
            <ChevronRight className="text-center mx-auto" />
          ) : (
            <ChevronLeft className="text-center mx-auto" />
          )}
        </Button>
      </div>
    </aside>
  );
};

export default AppSidebar;
