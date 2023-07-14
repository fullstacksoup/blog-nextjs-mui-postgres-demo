import { useState, useEffect, useContext, createContext } from 'react';
import AppBarMenu from './AppBarMenu';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import SettingIcon from '@mui/icons-material/Settings';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Drawer from '@mui/material/Drawer';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const MUIAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
  opacity: 0.9,
//  filter: 'blur(6px)',
  zIndex: 99,

}));
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const StyledToolbar = styled(AppBar)(({ theme }) => ({
  background: '#5c6e96',
  
  color: '#FFF',
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 38,
  },
  
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {    
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppLayout(props) {
  
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);


  const loading =  "loading"
  
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
     <Box sx={{ display: 'flex' }}>
        <MUIAppBar
          position="fixed"
          open={open}            
        >
        <Toolbar>
        
          <Tooltip
                arrow
                title={
                  <>
                    <Typography color="inherit"><b>Postgres Blog</b></Typography>
                    {'Latest updates to the site'}
                  </>
                }>
              <Button color="inherit" component={Link} href="/blog" sx={{ml: 2}}>Postgres Blog</Button>                  
          </Tooltip> 
                      

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={2}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
              <ThemeSwitch handleThemeChange={props.handleThemeChange} defaultVal={!props.darkState}/>                  
            </Box>                

            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
            >
              <SettingIcon />
            </IconButton>
           
            <AppBarMenu handleDrawerOpen={handleDrawerOpen} />
            </Stack>


          </Toolbar>
        </MUIAppBar>

        <Main open={open}>
          <DrawerHeader />
     
          <Container maxWidth="false" sx={{marginTop: '100px', overflowX:'hidden'}}>          
            {props.mainPage}            
          </Container>

        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>

          <Divider />
       
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
}

