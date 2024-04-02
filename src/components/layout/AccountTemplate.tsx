import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

interface AccountTemplateProps {
  title: string;
  description: string;
  footText: string;
  footLink: string;
  footLinkText: string;
  children: React.ReactNode;
}

const AccountTemplate: React.FC<AccountTemplateProps> = ({
  children,
  title,
  description,
  footText,
  footLinkText,
  footLink,
}) => {
  return (
    <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 w-screen h-screen">
      <div className="flex h-full justify-center items-center">
        <Card className="w-[380px] shadow-xl">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter className="flex justify-center items-center">
            {footText}
            <Button className="" variant={"link"} asChild>
              <Link to={footLink} className="text-indigo-500">
                {footLinkText}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AccountTemplate;
