import { createStyles, Theme } from "@material-ui/core";

export const addStorageStyle = (theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",
      width: "460px",
      height: "100%",
    },
    optBar: {
      marginTop: theme.spacing(4),
      textAlign: "center",
    },
  });
