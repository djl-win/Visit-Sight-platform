import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box'; import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TestChart from "../Charts/TestChart";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import "../DashboardCom/DashContainer.css"
import {reqModifyVenueCapacity, reqVenueCapacity, reqRealTimeCapacityVenue, reqVenueTodayTotalVisitor, reqVenueSevenDaysData } from '../../api'
import { useState, useEffect } from 'react';
import { error, success } from '../../utils/message.js'
import Venue2RealTimeChart from '../Charts/Venue2RealTimeChart';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const VenueContainer2 = () => {
  const [realTimeVisitors, setRealTimeVisitors] = useState("")

  const [museumCapacity, setMuseumCapacity] = useState("")

  const [TodayTotalVisitor, setTodayTotalVisitor] = useState("")

  const [realTime, setRealTime] = useState("none")

  const [sevenDays, setSevenDays] = useState("block")

  const [sevenDaysData, setSevenDaysData] = useState([])

  const [openDialog, setOpenDialog] = useState(false)

  const [venueCapacity, setVenueCapacity] = useState("")

    //handle the change in venue capacity
   const handleChange = (event) => {
    setVenueCapacity(event.target.value);
  };

  //update the venue capacity
  const submitCapacityModificaiton = async() =>{

    const venueId = 2;

    const response = await reqModifyVenueCapacity(venueId,venueCapacity);

    if (response.code === 200) {
      success("🦄 Capacity has been changed!")
    } else {
      error("🦄 " + response.msg);
    }
      setOpenDialog(false);
  }

  //open the update venue capacity page
  const handleOpenDialog = () => {
    setVenueCapacity("");
    setOpenDialog(true);
  };

  //close the update venue capacity page
  const handleCloseDialog = () => {
    setVenueCapacity("");
    setOpenDialog(false);
  };


  //get venue's capcity
  const handleMuseumCapacity = async () => {
    const venueId = 2;
    const response = await reqVenueCapacity(venueId);

    if (response.code === 200) {
      setMuseumCapacity(response.data);
    } else {
      error("🦄 " + response.msg);
    }

  }

  //get venue's realtime visitor
  const handleRealTimeCapacity = async () => {
    const response = await reqRealTimeCapacityVenue();
    if (response.code === 200) {
      if (response.data.length === 0) {
        setRealTimeVisitors(0);
      } else {
        setRealTimeVisitors(response.data[1].visitorNumber);
      }
    } else {
      error("🦄 " + response.msg);
    }

  }

  //get venue's daily visitor
  const handleTodayTotalVisitor = async () => {
    const response = await reqVenueTodayTotalVisitor();

    if (response.code === 200) {
      if (response.data.length === 0) {
        setTodayTotalVisitor(0);
      } else {
        setTodayTotalVisitor(response.data[1].visitorNumber);
      }
    } else {
      error("🦄 " + response.msg);
    }

  }

  //show real time visitor page
  const handleRealTimePage = () => {
    setRealTime("block");
    setSevenDays("none")
  }

  //show visitors in 7 days
  const handleSenvenDaysPage = () => {
    setRealTime("none");
    setSevenDays("block")
  }

  //get date in 7 days
  const handleSevenDaysData = async () => {
    const venueId = 2;
    const response = await reqVenueSevenDaysData(venueId);
    if (response.code === 200) {
      setSevenDaysData(response.data);
    } else {
      error("🦄 " + response.msg);
    }
  }

  //effect hook
  useEffect(() => {
    handleMuseumCapacity();
    handleRealTimeCapacity();
    handleTodayTotalVisitor();
    handleSevenDaysData();
  }, [])

  //excuse every 5 second
  useEffect(() => {
    const timer = setInterval(() => {
      handleMuseumCapacity();
      handleRealTimeCapacity();
      handleTodayTotalVisitor();
      handleSevenDaysData();

    }, 4000)
    return () => {
      clearInterval(timer)
    }

  }, []);

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
    <div>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            marginTop: "-30px"
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'end' }}>
                <Typography
                  variant="h4"
                  color="inherit"
                  noWrap
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Nunito Sans",
                    marginBottom: "5px"
                  }}
                >
                  Venue 2
                </Typography>
              </Box>
            </Grid>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={6} lg={3}>
                <IconButton onClick={handleRealTimePage} sx={{ p: 0 }}>
                  <Paper
                    className='RealTimeVisitorPaper'
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: "158px",
                      weight: "333px",
                      boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                      backdropFilter: "blur(5.5px)",
                      borderRadius: "30px",
                      border: "3px solid rgba( 255, 255, 255, 0.18 )"
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                    >
                      <div className='RealTimeVisitorPaperLeft'>
                        <div className='RealTimeVisitorPaperOne'>Real Time Visitor</div>

                        <div className='RealTimeVisitorPaperTwo'>{realTimeVisitors}/{museumCapacity}</div>

                        <div className='RealTimeVisitorPaperThree'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="#00B69B" />
                        </svg><div className='greenFont'>{'\u00A0'}3.8%{'\u00A0'}</div> Up from last hour</div>
                      </div>
                      <div className='RealTimeVisitorPaperLeft'>
                        <svg
                          width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z" fill="#8280FF" />
                          <path opacity="0.587821" fillRule="evenodd" clipRule="evenodd" d="M20.6667 23.3333C20.6667 26.2789 23.0545 28.6667 26 28.6667C28.9455 28.6667 31.3333 26.2789 31.3333 23.3333C31.3333 20.3878 28.9455 18 26 18C23.0545 18 20.6667 20.3878 20.6667 23.3333ZM34 28.6667C34 30.8758 35.7909 32.6667 38 32.6667C40.2091 32.6667 42 30.8758 42 28.6667C42 26.4575 40.2091 24.6667 38 24.6667C35.7909 24.6667 34 26.4575 34 28.6667Z" fill="#8280FF" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M25.9778 31.3333C19.6826 31.3333 14.5177 34.5687 14.0009 40.9323C13.9727 41.2789 14.6356 42 14.97 42H36.9956C37.9972 42 38.0128 41.194 37.9972 40.9333C37.6065 34.3909 32.3616 31.3333 25.9778 31.3333ZM45.2746 42L40.1333 42C40.1333 38.9988 39.1417 36.2291 37.4683 34.0008C42.0103 34.0505 45.7189 36.3469 45.998 41.2C46.0092 41.3955 45.998 42 45.2746 42Z" fill="#8280FF" />
                        </svg>
                      </div>
                    </Stack>
                  </Paper>
                </IconButton>
              </Grid>
              {/* Chart */}
              <Grid item xs={12} md={6} lg={3}>
                <IconButton onClick={handleSenvenDaysPage} sx={{ p: 0 }}>
                  <Paper
                    className='RealTimeVisitorPaper'
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: "158px",
                      weight: "333px",
                      boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                      backdropFilter: "blur(5.5px)",
                      borderRadius: "30px",
                      border: "3px solid rgba( 255, 255, 255, 0.18 )"
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                    >
                      <div className='RealTimeVisitorPaperLeft'>
                        <div className='RealTimeVisitorPaperOne'>Total Visitor--Today</div>

                        <div className='TotalVisitorPaperTwo'>{TodayTotalVisitor}</div>

                        <div className='RealTimeVisitorPaperThree'>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z" fill="#F93C65" />
                          </svg>
                          <div className='RedFont'>{'\u00A0'}2.4%{'\u00A0'}</div> Down from yesterday</div>
                      </div>
                      <div className='RealTimeVisitorPaperLeft'>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z" fill="#4AD991" />
                          <path d="M19.1111 40.8889H42.4444C43.3036 40.8889 44 41.5853 44 42.4444C44 43.3036 43.3036 44 42.4444 44H17.5556C16.6964 44 16 43.3036 16 42.4444V17.5556C16 16.6964 16.6964 16 17.5556 16C18.4147 16 19.1111 16.6964 19.1111 17.5556V40.8889Z" fill="#4AD991" />
                          <path opacity="0.5" d="M24.9126 34.175C24.325 34.8018 23.3406 34.8335 22.7139 34.2459C22.0871 33.6584 22.0554 32.6739 22.643 32.0472L28.4763 25.825C29.0445 25.2188 29.9888 25.1663 30.6209 25.7056L35.2249 29.6344L41.2235 22.0361C41.7559 21.3618 42.734 21.2467 43.4083 21.7791C44.0826 22.3114 44.1977 23.2896 43.6654 23.9639L36.6654 32.8305C36.1186 33.5231 35.1059 33.6227 34.4347 33.0499L29.7306 29.0358L24.9126 34.175Z" fill="#4AD991" />
                        </svg>

                      </div>
                    </Stack>
                  </Paper>
                </IconButton>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
              <IconButton onClick={handleOpenDialog} sx={{ p: 0 }}>
                <Paper
                  className='RealTimeVisitorPaper'
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "158px",
                    weight: "333px",
                    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                    backdropFilter: "blur(5.5px)",
                    borderRadius: "30px",
                    border: "3px solid rgba( 255, 255, 255, 0.18 )"
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                  >
                    <div className='RealTimeVisitorPaperLeft'>
                      <div className='RealTimeVisitorPaperOne'>Action{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</div>

                      <div className='RealTimeVisitorPaperTwo'>{museumCapacity}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</div>

                      <div className='RealTimeVisitorPaperThree'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5999 8.8H3.1999C2.98773 8.8 2.78425 8.71571 2.63422 8.56568C2.48419 8.41565 2.3999 8.21217 2.3999 8C2.3999 7.78782 2.48419 7.58434 2.63422 7.43431C2.78425 7.28428 2.98773 7.2 3.1999 7.2H13.5999C13.8121 7.2 14.0156 7.28428 14.1656 7.43431C14.3156 7.58434 14.3999 7.78782 14.3999 8C14.3999 8.21217 14.3156 8.41565 14.1656 8.56568C14.0156 8.71571 13.8121 8.8 13.5999 8.8ZM20.7999 8.8H17.5999C17.3877 8.8 17.1842 8.71571 17.0342 8.56568C16.8842 8.41565 16.7999 8.21217 16.7999 8C16.7999 7.78782 16.8842 7.58434 17.0342 7.43431C17.1842 7.28428 17.3877 7.2 17.5999 7.2H20.7999C21.0121 7.2 21.2156 7.28428 21.3656 7.43431C21.5156 7.58434 21.5999 7.78782 21.5999 8C21.5999 8.21217 21.5156 8.41565 21.3656 8.56568C21.2156 8.71571 21.0121 8.8 20.7999 8.8Z" fill="#111224" />
                          <path d="M15.5999 10.8C15.0461 10.8 14.5048 10.6358 14.0443 10.3281C13.5838 10.0204 13.225 9.58314 13.013 9.07151C12.8011 8.55988 12.7457 7.99689 12.8537 7.45374C12.9617 6.9106 13.2284 6.41169 13.62 6.0201C14.0116 5.62851 14.5105 5.36184 15.0536 5.2538C15.5968 5.14576 16.1598 5.20121 16.6714 5.41314C17.183 5.62506 17.6203 5.98394 17.928 6.4444C18.2357 6.90486 18.3999 7.44621 18.3999 8C18.3999 8.7426 18.1049 9.45479 17.5798 9.9799C17.0547 10.505 16.3425 10.8 15.5999 10.8ZM15.5999 6.8C15.3626 6.8 15.1306 6.87038 14.9332 7.00223C14.7359 7.13409 14.5821 7.32151 14.4912 7.54078C14.4004 7.76005 14.3767 8.00133 14.423 8.23411C14.4693 8.46688 14.5836 8.6807 14.7514 8.84853C14.9192 9.01635 15.133 9.13064 15.3658 9.17694C15.5986 9.22324 15.8399 9.19948 16.0591 9.10865C16.2784 9.01783 16.4658 8.86402 16.5977 8.66668C16.7295 8.46934 16.7999 8.23734 16.7999 8C16.7999 7.68174 16.6735 7.37651 16.4484 7.15147C16.2234 6.92643 15.9182 6.8 15.5999 6.8ZM20.7999 16.8H10.3999C10.1877 16.8 9.98425 16.7157 9.83422 16.5657C9.68419 16.4157 9.5999 16.2122 9.5999 16C9.5999 15.7878 9.68419 15.5843 9.83422 15.4343C9.98425 15.2843 10.1877 15.2 10.3999 15.2H20.7999C21.0121 15.2 21.2156 15.2843 21.3656 15.4343C21.5156 15.5843 21.5999 15.7878 21.5999 16C21.5999 16.2122 21.5156 16.4157 21.3656 16.5657C21.2156 16.7157 21.0121 16.8 20.7999 16.8ZM6.3999 16.8H3.1999C2.98773 16.8 2.78425 16.7157 2.63422 16.5657C2.48419 16.4157 2.3999 16.2122 2.3999 16C2.3999 15.7878 2.48419 15.5843 2.63422 15.4343C2.78425 15.2843 2.98773 15.2 3.1999 15.2H6.3999C6.61208 15.2 6.81556 15.2843 6.96559 15.4343C7.11562 15.5843 7.1999 15.7878 7.1999 16C7.1999 16.2122 7.11562 16.4157 6.96559 16.5657C6.81556 16.7157 6.61208 16.8 6.3999 16.8Z" fill="#111224" />
                          <path d="M8.4001 18.8C7.84631 18.8 7.30496 18.6358 6.8445 18.3281C6.38404 18.0204 6.02516 17.5831 5.81324 17.0715C5.60131 16.5599 5.54586 15.9969 5.6539 15.4537C5.76194 14.9106 6.02861 14.4117 6.4202 14.0201C6.81179 13.6285 7.3107 13.3618 7.85385 13.2538C8.39699 13.1458 8.95998 13.2012 9.47161 13.4131C9.98325 13.6251 10.4205 13.9839 10.7282 14.4444C11.0359 14.9049 11.2001 15.4462 11.2001 16C11.2001 16.7426 10.9051 17.4548 10.38 17.9799C9.8549 18.505 9.1427 18.8 8.4001 18.8ZM8.4001 14.8C8.16276 14.8 7.93075 14.8704 7.73341 15.0022C7.53608 15.1341 7.38227 15.3215 7.29144 15.5408C7.20062 15.7601 7.17685 16.0013 7.22316 16.2341C7.26946 16.4669 7.38375 16.6807 7.55157 16.8485C7.71939 17.0163 7.93321 17.1306 8.16599 17.1769C8.39877 17.2232 8.64005 17.1995 8.85932 17.1087C9.07859 17.0178 9.26601 16.864 9.39786 16.6667C9.52972 16.4693 9.6001 16.2373 9.6001 16C9.6001 15.6817 9.47367 15.3765 9.24863 15.1515C9.02358 14.9264 8.71836 14.8 8.4001 14.8Z" fill="#111224" />
                        </svg>{'\u00A0'}Current Capacity:{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</div>
                    </div>
                    <div className='RealTimeVisitorPaperLeft'>
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z" fill="#FF6F6F" />
                        <g clipPath="url(#clip0_10_486)">
                          <path d="M21.0833 44H38.5833C39.668 43.9969 40.7071 43.5636 41.4726 42.7953C42.2382 42.0269 42.6676 40.9862 42.6667 39.9015V31.1083C42.6667 30.7989 42.5438 30.5022 42.325 30.2834C42.1062 30.0646 41.8094 29.9417 41.5 29.9417C41.1906 29.9417 40.8938 30.0646 40.675 30.2834C40.4562 30.5022 40.3333 30.7989 40.3333 31.1083V39.9015C40.3349 40.3675 40.1515 40.8151 39.8234 41.146C39.4953 41.477 39.0493 41.6642 38.5833 41.6667H21.0833C20.6173 41.6642 20.1714 41.477 19.8433 41.146C19.5152 40.8151 19.3318 40.3675 19.3333 39.9015V22.4318C19.3318 21.9658 19.5152 21.5183 19.8433 21.1873C20.1714 20.8564 20.6173 20.6691 21.0833 20.6667H29.8333C30.1428 20.6667 30.4395 20.5438 30.6583 20.325C30.8771 20.1062 31 19.8094 31 19.5C31 19.1906 30.8771 18.8938 30.6583 18.6751C30.4395 18.4563 30.1428 18.3333 29.8333 18.3333H21.0833C19.9987 18.3364 18.9596 18.7697 18.194 19.5381C17.4285 20.3065 16.9991 21.3472 17 22.4318V39.9015C16.9991 40.9862 17.4285 42.0269 18.194 42.7953C18.9596 43.5636 19.9987 43.9969 21.0833 44Z" fill="#FF6F6F" />
                          <path d="M28.0307 28.3013L27.1102 32.5177C27.0686 32.7089 27.0757 32.9076 27.1309 33.0953C27.1862 33.2831 27.2878 33.454 27.4264 33.5922C27.5669 33.7269 27.7378 33.8258 27.9247 33.8804C28.1115 33.935 28.3088 33.9438 28.4997 33.906L32.7067 32.9832C32.9252 32.9352 33.1252 32.8255 33.2831 32.667L43.9161 22.034C44.2411 21.709 44.499 21.3231 44.6749 20.8985C44.8509 20.4738 44.9414 20.0186 44.9414 19.5589C44.9414 19.0992 44.8509 18.6441 44.6749 18.2194C44.499 17.7947 44.2411 17.4089 43.9161 17.0838C43.2496 16.447 42.3634 16.0916 41.4416 16.0916C40.5198 16.0916 39.6335 16.447 38.9671 17.0838L28.3504 27.7273C28.1911 27.8841 28.0801 28.0833 28.0307 28.3013ZM40.6167 18.7347C40.8387 18.522 41.1342 18.4033 41.4416 18.4033C41.7489 18.4033 42.0444 18.522 42.2664 18.7347C42.4822 18.9547 42.6031 19.2507 42.6031 19.5589C42.6031 19.8672 42.4822 20.1631 42.2664 20.3832L41.4416 21.208L39.7919 19.5583L40.6167 18.7347ZM30.2334 29.1343L38.1364 21.2115L39.7697 22.853L31.8632 30.7782L29.7691 31.2378L30.2334 29.1343Z" fill="#FF6F6F" />
                        </g>
                        <defs>
                          <clipPath id="clip0_10_486">
                            <rect width="28" height="28" fill="white" transform="translate(17 16)" />
                          </clipPath>
                        </defs>
                      </svg>


                    </div>
                  </Stack>
                </Paper>
                </IconButton>
              </Grid>
              {/* Chart */}
              <Grid item xs={9}>
                <Paper
                  sx={{
                    marginLeft: "15px",
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "580px",
                    weight: "1070px",
                    boxShadow: "0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                    backdropFilter: "blur(5.5px)",
                    borderRadius: "30px",
                    border: "3px solid rgba( 255, 255, 255, 0.18 )"
                  }}>
                  <TestChart show={sevenDays} chartData={sevenDaysData} />
                  <Venue2RealTimeChart show={realTime} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider >
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          fontFamily: 'Nunito Sans',
          fontStyle: "normal"
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "25px",
            fontWeight: "bold"
          }}
        >Venue 2 Capacity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter number of people allow in Venue 2
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Capacity"
            type="capacity"
            fullWidth
            variant="standard"
            value={venueCapacity}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={submitCapacityModificaiton} sx={{ textTransform: 'none' }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>



  );
}

export default VenueContainer2