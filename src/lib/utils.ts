import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

// string to Date format convertor "DD/MM/YYYY" to new Date(YYYY, MM, DD)
export function formattedDate(date: string): Date {
  const [day, month, year] = date.split("-");

  console.log(day, month, year, "day, month, year");

  // Create a new Date object by providing the year, month (adjusted by -1 as months are zero-based), and day
  const formattedDate = new Date(Number(year), Number(month) - 1, Number(day));

  return formattedDate;
};
