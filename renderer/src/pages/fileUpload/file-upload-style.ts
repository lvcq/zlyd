import { Theme, createStyles } from "@material-ui/core";

export const fileUploadStyle = (theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    fileList: {
      flexGrow: 1,
      overflow: 'auto'
    },
    optBar: {
      padding: theme.spacing(2, 4),
      textAlign: "center",
    },
    hidden: {
      display: "none",
    },
    optBtn:{
        margin:theme.spacing(0,2)
    }
  });
