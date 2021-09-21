import { makeStyles } from '@material-ui/core/styles';
import { Block } from '@material-ui/icons';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: 
  {
    display: 'flex',
  },
  appBar: 
  {
    transition: theme.transitions.create(['margin', 'width'], 
    {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    height: '120px',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  logoCobertura:{
    maxWidth: '450px',
    margin: 'auto'
  },
  pilLista :
  {
    display: 'flex',
    flexDirection: 'rows'
    
  },
  pilItem:
  {
    width: '100%',
    justifyContent: 'space-around',
    padding: '0px 5px',
    backgroundColor: 'black'
  },
  Grid:
  {
    padding: 15
  },
  nombreLIT : 
  {
    fontSize: '2rem'
  },
  typSmall :
  {
    fontSize : '1rem',
    color: '#b2bec3'
  }
}));

export default useStyles