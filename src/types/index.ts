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