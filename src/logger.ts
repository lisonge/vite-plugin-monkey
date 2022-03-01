import pc from 'picocolors';
import { delay } from './_util';

export type Message = string | number | null | undefined;

const log = (tag: string, message: Message) => {
  console.log(
    [
      pc.dim(new Date().toLocaleTimeString()),
      pc.bold(pc.blue(`[${tag}]`)),
      message,
    ].join('\x20')
  );
};
const info = (tag: string, message: Message) => {
  log(tag, pc.white(message));
};
const warn = (tag: string, message: Message) => {
  log(tag, pc.yellow(message));
};
const error = (tag: string, message: Message) => {
  log(tag, pc.red(message));
};
export const createLogger = (tag: string) => ({
  info: async (message: Message, delayTime?: number) => {
    if (typeof delayTime == 'number') {
      await delay(delayTime);
    }
    info(tag, message);
  },
  warn: async (message: Message, delayTime?: number) => {
    if (typeof delayTime == 'number') {
      await delay(delayTime);
    }
    warn(tag, message);
  },
  error: async (message: Message, delayTime?: number) => {
    if (typeof delayTime == 'number') {
      await delay(delayTime);
    }
    error(tag, message);
  },
});

export type Logger = ReturnType<typeof createLogger>;
