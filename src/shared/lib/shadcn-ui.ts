import { cx } from 'yummies/css';

export function cn(...inputs: Parameters<typeof cx>) {
  return cx(...inputs);
}
