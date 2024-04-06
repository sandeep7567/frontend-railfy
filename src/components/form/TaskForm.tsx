import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import {
  useCreateTaskMutation,
  useUpdateTaskByIdMutation,
} from "@/redux/api/taskSlice";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { toast } from "../ui/use-toast";

const profileFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  description: z.string().max(800).optional(),
  maintainceDate: z.date({
    required_error: "A maintenance date is required.",
  }),
  days: z
    .number()
    .min(1, { message: "Days must be at least 1" })
    .max(90, { message: "Days must not be longer than 90" }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.

const TaskForm = ({
  mode,
  task = [],
}: {
  mode: "new" | "edit" | undefined;
  task?: any[];
}) => {
  const [createTaskApi, {}] = useCreateTaskMutation();

  const [updateTaskApi, {}] = useUpdateTaskByIdMutation();

  const { id } = useParams();

  const navigate = useNavigate();

  const defaultValues: Partial<ProfileFormValues> = {
    title: mode !== "edit" ? "" : undefined,
    description: mode !== "edit" ? undefined : "",
    maintainceDate: mode !== "edit" ? undefined : undefined,
    days: mode !== "edit" ? undefined : 0,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (mode === "edit" && task && task.length > 0) {
      const editFormData =
        task?.length > 0 &&
        task
          .filter((taskData: any) => {
            return taskData._id === id;
          })
          .map((taskData: any) => {
            return {
              title: taskData.title,
              description: taskData.description,
              maintainceDate: taskData.maintainceDate,
              days: taskData.days,
            };
          });

      if (editFormData && editFormData.length > 0) {
        for (let i = 0; i < editFormData.length; i++) {
          Object.entries(editFormData[i]).forEach(([key, value]) => {
            if (
              key === "title" ||
              key === "description" ||
              key === "maintainceDate" ||
              key === "days"
            ) {
              form.setValue(key, value as string | number | Date | undefined);
            }
          });
        }
      } else {
        navigate("/task");
      }
    }
  }, [mode, task]);

  function onSubmit(data: ProfileFormValues) {
    if (mode === "edit" && task && task.length > 0) {
      // update task api call
      const formData = {
        ...data,
        _id: id,
        description: data.description ? data.description : undefined,
      };

      if (formData && formData._id) {
        updateTaskApi(formData);
        toast({ title: "updated successfully" });
      }
    } else if (mode === "new" && task.length === 0) {
      // create new Task api call
      const formData = {
        ...data,
        description: data.description ? data.description : undefined,
      };

      createTaskApi(formData);
      toast({ title: "created successfully" });
    }

    // reset the form
    if (mode !== "edit") {
      form.reset({
        title: "",
        description: "",
        days: 0,
        maintainceDate: undefined,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[50%] mx-auto"
      >
        <div className="flex lg:flex-row flex-col gap-y-4 gap-x-8  w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="lg:w-1/2 w-full">
                <FormLabel>
                  Title <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem className="lg:w-1/2 w-full">
                <FormLabel>
                  Days <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter a number"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(value);
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Next due date will be {field.value} days from now!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex lg:flex-row flex-col gap-10 w-full">
          <FormField
            control={form.control}
            name="maintainceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col lg:w-1/2 w-full">
                <FormLabel>
                  Maintaince Date <span className="text-destructive">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // disabled={(date) =>
                      //   // a cureent date and future date is allowed but an old date is not allowed also allow today date instead
                      //   date <= new Date(new Date())
                      // }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* TextArea */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discription</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Take note of what you are doing"
                  className="resize-none"
                  rows={8}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            className="bg-blue-500 hover:bg-blue-500/90 text-white hover:text-white/90 w-full lg:w-fit"
            type="submit"
          >
            {mode !== "edit" ? "Create" : "Update"}
          </Button>
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
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
