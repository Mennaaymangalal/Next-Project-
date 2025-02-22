"use client"
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import cookie from "js-cookie" 
import { SetUserIsLoggedIn } from '@/Redux/AuthSliceIniteState/AuthSliceIniteState';
import { useRouter } from 'next/navigation';


const pages = [
{name: "Home" , href:"/"},
{name: "Posts" , href:"/posts"},
];
const settings = {
  LoggedIn:  ['Profile', 'Account', 'Dashboard'],
  NotLoggedIn :['login' , 'register']
}

 export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { isLoggedIn } = useSelector((state : any )=>state.auth)
  
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {push} = useRouter()

  const dispatch = useDispatch()
   function Logout() 
  {
    handleCloseUserMenu()
    cookie.remove("token")
    dispatch(SetUserIsLoggedIn(false))
    push("/login")
  }

  if (!isMounted) return null;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
        {/* disableGutters */}
          <WorkspacesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Circle
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          { isLoggedIn &&
              <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          }
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {isLoggedIn && pages.map((page) => (
                <MenuItem  key={page.name} onClick={handleCloseNavMenu}>
                   <Link
                  href={page.href}
                  key={page.name}               
                  style={{ textDecoration: 'none' , marginLeft: 16 , marginRight:16 , color: 'black', display: 'block' }}
              >
                <Typography sx={{textAlign: 'center' }}>{page.name}</Typography>
              </Link>
                 
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <WorkspacesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Circle
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isLoggedIn && pages.map((page) => (
              <Link
               href={page.href}
                key={page.name}
                onClick={handleCloseNavMenu}
                style={{textDecoration:'none' , marginLeft: 16 , marginRight: 16, color: 'white', display: 'block' }}
              >
                <Typography sx={{fontSize:"18px"}}>
                {page.name}
                </Typography>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? settings.LoggedIn.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                 <Link style={{textDecoration: 'none' , color:'inherit'}} href={"/" + setting.toLowerCase()}>
                 <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                 </Link>
                </MenuItem>
              )) :
              settings.NotLoggedIn.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link style={{textDecoration: 'none' , color:'inherit'}} href={"/" + setting.toLowerCase()}>
                 <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                 </Link>
                </MenuItem>
              ))}
                {isLoggedIn && (
                 <MenuItem onClick={Logout}>                
                 <Typography sx={{ textAlign: 'center' }}>
                  Logout
                 </Typography>                 
                </MenuItem>
                )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

