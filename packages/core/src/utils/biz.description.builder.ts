export const buildBizDesc = (
  className: string,
  method: string,
  suffix?: string,
): string => {
  return suffix?.length
    ? `${className}@${method}:\n${suffix}`
    : `${className}@${method}`;
};
