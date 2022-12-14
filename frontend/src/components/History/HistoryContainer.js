import * as React from 'react';
import Box from '@mui/material/Box'; import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import HistpryChart from '../Charts/HistoryChart';
import { reqHistory } from '../../api';
import { error } from '../../utils/message.js'

const HistoryContainer = () => {

    const [value, setValue] = useState(new Date());
    const [value1, setValue1] = useState(new Date());
    const [venueId, setVenueId] = useState('');
    const [searchData,setSearchData] = useState([]);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChange1 = (newValue) => {

        setValue1(newValue);
    };

    const handleChange2 = (event) => {

        setVenueId(event.target.value);

    };

    const handleHistory = async() =>{
        const response =  await reqHistory(value,value1,venueId);
        console.log(response.data)
        if (response.code === 200) {
            setSearchData(response.data);
          } else {
            error("🦄 " + response.msg);
          }
        
    }

    return (

        <div >
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',

                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>
                    {/* Grid - Box as container for page name */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'end' }}>
                            <Typography
                                variant="h4"
                                color="inherit"
                                noWrap
                                sx={{
                                    fontWeight: "bold",
                                    fontFamily: "Nunito Sans",
                                    marginBottom: "5px",
                                    marginLeft: "30px",
                                }}
                            >
                                History
                            </Typography>
                        </Box>
                    </Grid>
                    {/* Grid - Box as container for comment table */}
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12}>


                            <Paper sx={{
                                marginTop: "50px",
                                marginLeft: "15px",
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: "600px",
                                width: "1000px",
                                boxShadow: "0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                                backdropFilter: "blur(5.5px)",
                                borderRadius: "30px",
                                border: "3px solid rgba( 255, 255, 255, 0.18 )"
                            }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack
                                        direction="row"
                                        spacing={22}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                        >
                                            <DesktopDatePicker
                                                label="Start Date"
                                                inputFormat="MM/DD/YYYY"
                                                value={value}
                                                onChange={handleChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            <DesktopDatePicker
                                                label="End Date"
                                                inputFormat="MM/DD/YYYY"
                                                value={value1}
                                                onChange={handleChange1}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            <div>
                                                <TextField
                                                    select
                                                    label="Venue"
                                                    value={venueId}
                                                    onChange={handleChange2}
                                                    helperText="Please select Venue"
                                                >
                                                    <MenuItem value={1}>Venue 1</MenuItem>
                                                    <MenuItem value={2}>Venue 2</MenuItem>
                                                    <MenuItem value={3}>Venue 3</MenuItem>
                                                </TextField>
                                            </div>

                                        </Stack>
                                        <Button
                                            variant="text"
                                            onClick={handleHistory}
                                            // disableRipple
                                            sx={{

                                                marginLeft: "50px",
                                                fontSize: 18,
                                                height: "60px",
                                                // "&:hover": { backgroundColor: "transparent" },
                                                textTransform: 'none'
                                            }}>
                                            Search
                                        </Button>
                                    </Stack>
                                    <HistpryChart show={true} chartData={searchData}/>
                                </LocalizationProvider>


                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}

export default HistoryContainer;