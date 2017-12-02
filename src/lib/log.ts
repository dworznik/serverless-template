import {Context} from 'aws-lambda';
import * as R from 'ramda';

function wrap(fn: (message?: any, ...optionalParams: any[]) => void, level: string, context?: Context, event?: Event) {
  return (message?: string, ...objects: object[]): void => {
    return fn(JSON.stringify(R.mergeAll([...objects, {level}, {context}, {event}, {message}])));
  };
}

declare global {
  interface Console {
    error(message: string, ...objects: object[]): void;
    info(message: string, ...objects: object[]): void;
    log(message: string, ...objects: object[]): void;
    warn(message: string, ...objects: object[]): void;
  }
}

export function setupLogging(console: Console, context?: Context, event?: any) {
  console.log = wrap(console.log, 'debug', context, event);
  console.error = wrap(console.error, 'error', context, event);
  console.warn = wrap(console.warn, 'warn', context, event);
  console.info = wrap(console.info, 'info', context, event);
}
