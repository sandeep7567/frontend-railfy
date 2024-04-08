import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// string to Date format convertor "DD/MM/YYYY" to new Date(YYYY, MM, DD)
export function formattedDate(date: string): Date {
  const [day, month, year] = date.split("-");

  // Create a new Date object by providing the year, month (adjusted by -1 as months are zero-based), and day
  const formattedDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day) + 1
  );

  return formattedDate;
}

export function isValidObjectId(id: string): boolean {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/; // Regular expression for MongoDB ObjectID
  objectIdPattern.test(id);
  if (id === "new") {
    return true;
  } else if (id) {
    return objectIdPattern.test(id);
  } else {
    return true;
  }
}
