import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box'; import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TestChart from "../Charts/TestChart";
import Typography from '@mui/material/Typography';
import "./DashContainer.css";
import Stack from '@mui/material/Stack';
import { reqModifyParkingLotCapacity, reqMuseumCapacity, reqRealTimeCapacity, reqTodayTotalVisitor, reqParkingLotInfo, reqSevenDaysData } from '../../api'
import { useState, useEffect } from 'react';
import { error, success } from '../../utils/message.js'
import MuseumRealTimeChart from '../Charts/MuseumRealTimeChart';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ChartContainer = () => {
  const [realTimeVisitors, setRealTimeVisitors] = useState("")

  const [museumCapacity, setMuseumCapacity] = useState("")

  const [TodayTotalVisitor, setTodayTotalVisitor] = useState("")

  const [ParkingLotInfo, setParkingLotInfo] = useState("")

  const [realTime, setRealTime] = useState("none")

  const [sevenDays, setSevenDays] = useState("block")

  const [sevenDaysData, setSevenDaysData] = useState([])

  const [openDialog, setOpenDialog] = useState(false)

  const [capacity, setCapacity] = useState("")

  //handle the change in  car spot capacity
  const handleChange = (event) => {
    setCapacity(event.target.value);
  };

  //update the car spot capacity
  const submitCapacityModificaiton = async() =>{
    const response = await reqModifyParkingLotCapacity(capacity);

    if (response.code === 200) {
      success("🦄 Capacity has been changed!")
    } else {
      error("🦄 " + response.msg);
    }
      setOpenDialog(false);
  }

  //open the update car spot availability page
  const handleOpenDialog = () => {
    setCapacity("");
    setOpenDialog(true);
  };

  //close the update car spot availability page
  const handleCloseDialog = () => {
    setCapacity("");
    setOpenDialog(false);
  };

  //get date in 7 days
  const handleSevenDaysData = async () => {
    const response = await reqSevenDaysData();
    if (response.code === 200) {
      setSevenDaysData(response.data);
    } else {
      error("🦄 " + response.msg);
    }
  }

  //get museum's capacity
  const handleMuseumCapacity = async () => {
    const response = await reqMuseumCapacity();

    if (response.code === 200) {
      setMuseumCapacity(response.data);
    } else {
      error("🦄 " + response.msg);
    }

  }

  //get real time visitor data
  const handleRealTimeCapacity = async () => {
    const response = await reqRealTimeCapacity();

    if (response.code === 200) {
      setRealTimeVisitors(response.data);
    } else {
      error("🦄 " + response.msg);
    }

  }

  //get the total visitor data
  const handleTodayTotalVisitor = async () => {
    const response = await reqTodayTotalVisitor();

    if (response.code === 200) {
      setTodayTotalVisitor(response.data);
    } else {
      error("🦄 " + response.msg);
    }

  }

  //get real time availability for car spot
  const handleParkingLotInfo = async () => {
    const response = await reqParkingLotInfo();
    // console.log(response.data)
    if (response.code === 200) {
      setParkingLotInfo(response.data)
    } else {
      error("🦄 " + response.msg);
    }

  }

  //show the real time visitor chart
  const handleRealTimePage = () => {
    setRealTime("block");
    setSevenDays("none")
  }

  //show the visitors in 7 days chart
  const handleSenvenDaysPage = () => {
    setRealTime("none");
    setSevenDays("block")
  }

  //effect hook
  useEffect(() => {
    handleMuseumCapacity();
    handleRealTimeCapacity();
    handleTodayTotalVisitor();
    handleParkingLotInfo();
    handleSevenDaysData();

  }, [])


  //excuse every 5 second
  useEffect(() => {

    const timer = setInterval(() => {
      handleMuseumCapacity();
      handleRealTimeCapacity();
      handleTodayTotalVisitor();
      handleParkingLotInfo();
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
                  Museum
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
                        </svg><div className='greenFont'>{'\u00A0'}8.5%{'\u00A0'}</div> Up from last hour</div>
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
                          <div className='RedFont'>{'\u00A0'}4.3%{'\u00A0'}</div> Down from yesterday</div>
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
                        <div className='RealTimeVisitorPaperOne'> Available Car Spot</div>

                        <div className='RealTimeVisitorPaperTwo'>{ParkingLotInfo.parkinglotCurrentFlow}/{ParkingLotInfo.parkinglotCapacity}</div>

                        <div className='RealTimeVisitorPaperThree'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="#00B69B" />
                        </svg><div className='greenFont'>{'\u00A0'}4.5%{'\u00A0'}</div> Up from last hour</div>
                      </div>
                      <div className='RealTimeVisitorPaperLeft'>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z" fill="#FEC53D" />
                          <path d="M42.2673 20.6C41.9114 19.6398 40.934 19 39.7778 19H20.2223C19.066 19 18.0886 19.6398 17.7327 20.6L14 29.4V41.4C14 42.2797 14.8003 43 15.7778 43H17.5556C18.533 43 19.3333 42.2797 19.3333 41.4V40.6H40.6667V41.4C40.6667 42.2797 41.467 43 42.4444 43H44.2222C45.1997 43 46 42.2797 46 41.4V29.4L42.2673 20.6ZM20.2223 35.8C18.7118 35.8 17.5556 34.7601 17.5556 33.4C17.5556 32.0399 18.7118 31 20.2223 31C21.7327 31 22.8889 32.04 22.8889 33.4C22.8889 34.7601 21.7327 35.8 20.2223 35.8ZM39.7778 35.8C38.2673 35.8 37.1111 34.7601 37.1111 33.4C37.1111 32.0399 38.2673 31 39.7778 31C41.2882 31 42.4444 32.04 42.4444 33.4C42.4444 34.7601 41.2882 35.8 39.7778 35.8ZM17.5556 27.8L20.2223 21.4H39.7778L42.4444 27.8H17.5556Z" fill="#FEC53D" />
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
                  <MuseumRealTimeChart show={realTime} />
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
        >Parking Lot Capacity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter number of cars allow in parking lot
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Capacity"
            type="capacity"
            fullWidth
            variant="standard"
            value={capacity}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{textTransform: 'none' }}>Cancel</Button>
          <Button onClick={submitCapacityModificaiton} sx={{textTransform: 'none' }}>Submit</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default ChartContainer