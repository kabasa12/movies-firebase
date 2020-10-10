import React,{useContext,useState} from 'react';
import {useHistory} from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar,Toolbar,List,Typography,Divider,Grid,SwipeableDrawer} from '@material-ui/core';
import {IconButton,ListItem,ListItemIcon,ListItemText,CssBaseline } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../assets/images/logo.png'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import 'fontsource-jolly-lodger/index.css';
import Context from '../../context/context';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  mytoolbar:{maxHeight:"64px",
            width:"100%",
            backgroundColor: "#ffff00",
            color:"#000"},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  header:{
    fontFamily:"Jolly Lodger",
    letterSpacing:2,
    fontSize:22
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [state,dispatch] = useContext(Context);
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const name = e.currentTarget.getAttribute('name')
    history.push('/' + name)
  };

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
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
        <Toolbar className={classes.mytoolbar}>
          <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Grid container>
              <Typography variant="h6" noWrap>
                Movies Subscribe
              </Typography>
              </Grid>
              <Grid container style={{justifyContent:"flex-end"}}>
                <img src={logo} alt="" />
              </Grid>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.list} role="presentation"
             onClick={toggleDrawer(false)}
             onKeyDown={toggleDrawer(false)}>
          {!state.isLogin ? 
          <List>
              <ListItem button name='' onClick={handleNavClick}>
                  <ListItemIcon><SaveAltIcon /></ListItemIcon>
                  <ListItemText disableTypography
                      primary={<Typography className={classes.header}>Sign In</Typography>}
                      />
              </ListItem>
          </List> 
          :
          <List>
              <ListItem button name='' onClick={handleNavClick}>
                  <ListItemIcon><HighlightOffIcon /></ListItemIcon>
                  <ListItemText disableTypography
                      primary={<Typography className={classes.header}>Sign Out</Typography>}
                  />
              </ListItem>
              {state.userPermissions.viewMovies ?
              <ListItem button name='movies' onClick={handleNavClick}>
                  <ListItemIcon><LocalMoviesIcon /></ListItemIcon>
                  <ListItemText disableTypography
                      primary={<Typography className={classes.header}>Movies</Typography>}
                  />
              </ListItem> : '' }
              {state.userPermissions.viewSubscriptions ?
              <ListItem button name='members' onClick={handleNavClick}>
                  <ListItemIcon><SubscriptionsIcon /></ListItemIcon>
                  <ListItemText disableTypography
                      primary={<Typography className={classes.header}>Subscriptions</Typography>}
                   />
              </ListItem> : ''}
          </List>
          }
          <Divider />
          {!state.currentUser.isAdmin || !state.isLogin ? '' : 
          <List>
            <ListItem button name='users' onClick={handleNavClick}>
                  <ListItemIcon><PeopleAltIcon /></ListItemIcon>
                  <ListItemText disableTypography
                      primary={<Typography className={classes.header}>User Management</Typography>}
                  />
              </ListItem>
          </List>
          }
        </div>
      </SwipeableDrawer>
    </div>
  );
}
