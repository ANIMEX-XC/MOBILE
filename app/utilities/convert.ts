export const convertNumberToCurrency = (
  money: any,
  currency: string = ""
): string => {
  money = Math.floor(money);
  return (
    (currency ? currency : "") +
    (!money
      ? "0"
      : money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")) +
    ""
  );
};

export const convertIsoTime = (time: string) => {
  const date = new Date(time);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
};
