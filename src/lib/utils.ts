import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: string, time: boolean = true) {
  return format(new Date(date), `yyyy-MM-dd${time ? " HH:mm:ss" : ""}`);
}
