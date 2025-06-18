import moment from "moment";

export const formatDate = (date, format = "MMMM Do YYYY, h:mm A") => {
  return moment(date).format(format);
};
