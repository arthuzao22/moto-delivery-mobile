import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Junta classes do Tailwind resolvendo conflitos (a última vence), como no RN Reusables. */
export function cn(...entradas: ClassValue[]): string {
  return twMerge(clsx(entradas));
}
