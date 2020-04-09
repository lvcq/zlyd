import { createStyles, Theme } from "@material-ui/core";

export const storageSelectStyle = (theme: Theme) =>
  createStyles({
    selectItem: {
      color: "inherit",
      minWidth: "120px",
      "& .MuiSelect-icon": {
        color: "inherit",
      },
      "&.MuiInput-underline:before": {
        borderBottomColor: theme.palette.primary.light,
      },
      "&.MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottomColor: theme.palette.primary.light,
      },
    },
  });
