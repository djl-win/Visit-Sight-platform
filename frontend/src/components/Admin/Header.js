import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { storageUtils } from "../../utils/storageUtils"
import {reqOpenMuseum, reqCloseMuseum} from "../../api"
import { success,error,warn } from '../../utils/message';

import InsightsIcon from '@mui/icons-material/Insights';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Header = () => {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  //hand open and close pop up menu in the header
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //open the museum
  const handleOpenMuseum = async() => {
    const response = await reqOpenMuseum();

    if(response.code === 200){
      success("🦄 The museum is now open!")
    }else{
      error("🦄 " + response.msg)
    }
    handleCloseUserMenu();
  };

    //close the museum
    const handleCloseMuseum = async() => {
      const response = await reqCloseMuseum();
  
      if(response.code === 200){
        warn("🦄 The museum will soon be closed!")
      }else{
        error("🦄 " + response.msg)
      }
      handleCloseUserMenu();
    };
    
    //define the theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
        contrastText: "000000"
      },
      secondary: {
        main: "#448aff",
        contrastText: "#FFFFFF",
      },
    },
  });

  return (
    
    <ThemeProvider theme={theme}>
      <AppBar position="absolute" sx={{height: "70px", boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)"}}>
        <Toolbar sx={{
          pr: '30px',
        }}
        >
          {/* logo in the top left of the header */}
          <Typography component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Visit<InsightsIcon />Sight
          </Typography>

          <Box sx={{ flexGrow: 0 , display: "flex"}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="profile_img" src={localStorage.getItem("avatar")} />
              </IconButton>
            </Tooltip>
            <div style={{
                  color: "black",
                  fontFamily: "Nunito Sans",
                  fontWeight: "bold",
                  paddingLeft: "10px",
                  paddingRight: "20px",
                  paddingTop:"3px" ,
                  fontSize: "20px"
                }}>{storageUtils.getUser().peopleName}</div>
            
            {/* pop up menu in the header to open and close the museum*/}
            <Menu
              sx={{ mt: '50px' }}
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
                <MenuItem onClick={handleOpenMuseum}>
                  <Typography textAlign="center">Open Museum</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMuseum}>
                  <Typography textAlign="center">Close Museum</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

    </ThemeProvider>


  );

}

export default Header
