import { PropsWithChildren } from "react";

export const WrapperLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-10/12 mx-auto ml-16 lg:ml-24 xl:ml-24 2xl:ml-56 mt-16">
      <div className="w-[100%] md:w-3/4 lg:w-10/12 xl:w-full pr-2 md:p-0 ml-auto grid-cols-1 gap-4 my-10">
        <div className="flex flex-col gap-10">
          {children}
        </div>
      </div>
    </div>
  );
};