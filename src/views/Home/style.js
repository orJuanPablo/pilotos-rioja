import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    height: "120px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  logoCobertura: {
    maxWidth: "450px",
    margin: "auto",
  },
  pilContainer: {
    flexDirection: "colums",
  },
  searchContainer: {
    align: "left",
    marginRight: "10px",
    marginLeft: "auto",
  },
  pilLista: {
    display: "flex",
    flexDirection: "column",
  },
  modalAdd:{
  position: 'absolute',
  width: 400,
  backGround : 'rgba(9, 132, 227, 0.5)',
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2,4,3),
  top: '50%',
  left: '50%',
  transform: 'Translate(-50%, -50%)'
  },
  modalTitle :{
    backGroundColor : '#d63031',
    color: '#fff'
  },
  checkTutor :{
    display:'flex',
    flexDirection:'rows'
  },
  formTextField: {
    width: '100%'
  },
  selectForm: {
    width: '50%'
  },
TableHead: {
  color : "#e84118",
  backGroundColor: "#576574"
}
}));


export default useStyles;
