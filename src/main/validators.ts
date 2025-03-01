/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObject = (value: any) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};
