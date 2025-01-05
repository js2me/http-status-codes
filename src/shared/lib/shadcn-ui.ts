import { cx } from 'yammies/css';

export function cn(...inputs: Parameters<typeof cx>) {
  return cx(...inputs);
}
