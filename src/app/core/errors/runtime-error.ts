export type RuntimeErrorSeverity = 'info' | 'warning' | 'error' | 'fatal';

export interface RuntimeError {
  code: string;
  severity: RuntimeErrorSeverity;
  message: string;
  sourceId?: string;
  recoverable: boolean;
}

