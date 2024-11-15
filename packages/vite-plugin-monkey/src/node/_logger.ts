import pc from 'picocolors';

export type Message = string | number | null | undefined;
interface OutputOptions {
  /**
   * @default false
   */
  time?: boolean;
}

const log = (tag: string, message: Message, options?: OutputOptions) => {
  console.log(
    [
      (options?.time ?? false) === true
        ? pc.dim(new Date().toLocaleTimeString())
        : '',
      pc.bold(pc.blue(`[${tag}]`)),
      message,
    ]
      .filter((s) => s)
      .join('\x20'),
  );
};
const info = (tag: string, message: Message, options?: OutputOptions) => {
  log(tag, pc.white(message), options);
};
const warn = (tag: string, message: Message, options?: OutputOptions) => {
  log(tag, pc.yellow(message), options);
};
const error = (tag: string, message: Message, options?: OutputOptions) => {
  log(tag, pc.red(message), options);
};
export const createLogger = (tag: string) => ({
  info: async (message: Message, options?: OutputOptions) => {
    info(tag, message, options);
  },
  warn: async (message: Message, options?: OutputOptions) => {
    warn(tag, message, options);
  },
  error: async (message: Message, options?: OutputOptions) => {
    error(tag, message, options);
  },
});

/**
 * default logger
 */
export const logger = createLogger('plugin-monkey');

export type Logger = ReturnType<typeof createLogger>;
