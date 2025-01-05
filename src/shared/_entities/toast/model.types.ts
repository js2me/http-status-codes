import { ReactNode } from 'react';
import { ExternalToast } from 'sonner';

export interface CreateToastPayload extends ExternalToast {
  message: string | ReactNode;
  type?: 'success' | 'info' | 'warning' | 'error';
}
