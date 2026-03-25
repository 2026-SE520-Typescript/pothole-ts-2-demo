export const appLogger = (...message: unknown[]): void => {
    console.log('[LOGGER]: ', ...message);
};
