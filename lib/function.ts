import { CompanyName } from "./types";

export const formatDateToYYYYMMDD = (date: Date | string): string => {
  const inputDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(inputDate.getTime())) {
    return "Invalid date"; // Handle invalid dates gracefully
  }

  // Extract LOCAL time-based date components (adjusted for PH Time)
  const year = String(inputDate.getFullYear()); // Use `getFullYear()` instead of `getUTCFullYear()`
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Use `getMonth()`
  const day = String(inputDate.getDate()).padStart(2, "0"); // Use `getDate()`

  return `${year}-${month}-${day}`;
};

export const formateMonthDateYear = (date: Date | string): string => {
  const inputDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(inputDate.getTime())) {
    return "Invalid date"; // Handle invalid dates gracefully
  }

  const year = String(inputDate.getFullYear()); // Full year
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(inputDate.getDate()).padStart(2, "0");

  return `${month}/${day}/${year}`;
};

export const formatTime = (date: Date | string): string => {
  const inputDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(inputDate.getTime())) {
    return "Invalid date"; // Handle invalid dates gracefully
  }

  let hours = inputDate.getHours(); // Get hours (0-23)
  const minutes = String(inputDate.getMinutes()).padStart(2, "0"); // Get minutes with leading zero
  const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM

  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format (0 becomes 12)

  return `${hours}:${minutes} ${ampm}`;
};

export const formatDay = (date: Date | string): string => {
  const inputDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(inputDate.getTime())) {
    return "Invalid date"; // Handle invalid dates gracefully
  }

  // Force UTC-based day extraction
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[inputDate.getUTCDay()]; // Use `getUTCDay()` instead of `getDay()`

  return dayName;
};

export const formatAccountNumber = (value: string): string => {
  return (
    value
      .replace(/\D/g, "") // Remove non-numeric characters
      .match(/.{1,4}/g) // Split into groups of 4
      ?.join(" - ") || ""
  ); // Join with ' - ' and return
};

export const formatDateToLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const bgColor = (companyName: CompanyName) => {
  switch (companyName) {
    case "district-1":
      return "bg-amber-950 dark:bg-amber-950";
    case "warehouse-pal-project":
      return "bg-blue-950 dark:bg-blue-950";
    case "dispatcher-1":
      return "bg-indigo-950 dark:bg-indigo-950";
    case "agri-plus":
      return "bg-green-950 dark:bg-lime-950";
    default:
      return "bg-stone-900";
  }
};
