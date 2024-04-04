export interface NavDataType {
  name: string;
  href: string;
  icon: any;
  path: boolean;
};

export interface AppSidebarProps {
  setMobileView?: React.Dispatch<React.SetStateAction<boolean>>;
  mobileView?: boolean;
}

export interface TaskFormType {
  _id?: string;
  title: string;
  description: string | undefined;
  days: number;
  dueDate: string | undefined;
  maintainceDate: string;
}