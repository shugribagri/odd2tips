import { format, parseISO, isValid } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);

  // Check if the parsed date is valid
  if (!isValid(date)) {
    console.warn("Invalid date:", dateString);
    // Return a fallback or a default message if the date is invalid
    return <span>Invalid date</span>;
  }

  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default DateFormatter;
