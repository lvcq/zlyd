import { createStyles, Theme } from "@material-ui/core";
const drawerWidth = 240;
export const homeStyle = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      overflow: "hidden",
      height: "100%",
    },
    storageSelect: {
      flexGrow: 1,
      textAlign: "center",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: theme.spacing(7) + 1,
      width: `calc(100% - ${theme.spacing(7) + 1}px)`,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(9) + 1,
        width: `calc(100% - ${theme.spacing(9) + 1}px)`,
      },
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    homeIcon: {
      padding: theme.spacing(0),
      marginTop: theme.spacing(0.5),
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      position: "relative",
      padding: theme.spacing(3),
    },
    subContent: {
      flexGrow: 1,
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  });
