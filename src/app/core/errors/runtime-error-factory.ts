import type { RuntimeError, RuntimeErrorSeverity } from './runtime-error';

export function runtimeError(
  code: string,
  message: string,
  options: {
    severity?: RuntimeErrorSeverity;
    sourceId?: string;
    recoverable?: boolean;
  } = {},
): RuntimeError {
  return {
    code,
    severity: options.severity ?? 'error',
    message,
    sourceId: options.sourceId,
    recoverable: options.recoverable ?? true,
  };
}

