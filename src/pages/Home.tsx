import LayoutHOC from "@/components/layout/LayoutHOC";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { PlusCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const data = [];
  return (
    <div className="w-10/12 mx-auto ml-56 mt-16">
      {/* if data is not empty */}
      {data.length > 0 && (
        <Card className="flex shadow-none bg-none w-fit ml-auto justify-end items-center mb-2">
          <Button
            variant={"ternary"}
            className="bg-blue-500 w-fit mx-auto hover:bg-blue-500/90 text-white"
          >
            <PlusCircleIcon className="mr-2 h-5 w-5" /> Create Task
          </Button>
        </Card>
      )}

      {/* if data is empty */}
      {data.length === 0 && (
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

export default LayoutHOC(Home);
