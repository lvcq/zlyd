import moment from "moment";

export function formatDate(
  date: number | string | Date,
  fmt: string = "YYYY-MM-DD"
) {
  return moment(date).format(fmt);
}
