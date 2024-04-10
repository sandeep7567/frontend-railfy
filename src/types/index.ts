export interface NavDataType {
  name: string;
  href: string;
  icon: any;
  path: boolean;
};

export interface AppSidebarProps {
  setMobileView?: React.Dispatch<React.SetStateAction<boolean>>;
  mobileView?: boolean;
};

export interface TaskFormType {
  _id?: string;
  title: string;
  description: string | undefined;
  days: number;
  dueDate: Date;
  maintainceDate?: Date;
  isHistory?: boolean;
  status?: Status;
  version?: number;
};

enum Status {
  "created",
  "updated",
  "deleted",
}

export interface TaskData {
  _id?: string;
  title?: string;
  description?: string | undefined;
  maintainceDate?: string;
  dueDate?: string;
  days?: number;
  status?: Status;
  version?: number;
};
export interface DeleteModalProps {
  type: "deleteTask" | "deleteHistory" | "deleteTaskById" | "deleteHistoryById";
  deleteId?: string | null;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};