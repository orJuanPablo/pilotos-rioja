import {React, useState} from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import PilotIcon from '@material-ui/icons/SportsMotorsports';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import logoCobertura from '../../img/LogoCoberturaMedicaHeader.png'
import useStyles from './style'

import Pilotos from './components/Pilotos/PilotosLista/PilotosLista.js';

export default function PersistentDrawerLeft({token}) 
{   
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <img src={logoCobertura} style={{width: 600, height: 150, margin: 'auto auto'}}/>              
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button key='eventosRuta' onClick = {()=>{alert('Eventos')}}>
                  <ListItemIcon> <EventIcon color = 'primary'/>  </ListItemIcon>
                  <ListItemText primary='Eventos' />
                </ListItem>
                <ListItem button key='pilotosRuta' onClick = {()=>{alert('pilotos')}}>
                  <ListItemIcon> <PilotIcon color = 'primary'/>  </ListItemIcon>
                  <ListItemText primary='Pilotos' />
                </ListItem>
                <Divider />
                <ListItem button key='accidentesRuta' onClick = {() => {alert('ACCIDENTES')}}>
                  <ListItemIcon> <LocalHospitalIcon color = 'primary'/>  </ListItemIcon>
                  <ListItemText primary='Accidentes' />
                </ListItem>  
            </List>
            <Divider />
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            
            <Pilotos token = {token}/>
            
          </main>
        </div>
      );
    }
