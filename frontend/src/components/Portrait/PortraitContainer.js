import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box'; import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import "../Portrait/PortraitContainer.css"
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PortraitAgeChart from '../Charts/PortraitAgeChart';
import PortraitGenderChartAll from '../Charts/PortraitGenderChartAll';
import PortraitGenderChartDays from '../Charts/PortraitGenderChartDays';

const PortraitContainer = () => {
    //switch between all gender chart and 7 days gender chart
    const [showAllGender, setshowAllGender] = useState("block")

    const [showSevenDaysGender, setshowSevenDaysGender] = useState("none")

    const [showAge, setAgeData] = useState("none")


    const showAllGenderChart = () => {
        setshowAllGender("block");
        setshowSevenDaysGender("none");
        setAgeData("none");

    };
    const showSevenDaysGenderChart = () => {
        setshowAllGender("none");
        setshowSevenDaysGender("block");
        setAgeData("none");

    };
    const showAgeChart = () => {
        setshowAllGender("none");
        setshowSevenDaysGender("none");
        setAgeData("block");
    };

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
                                    marginBottom: "5px",
                                }}
                            >
                                Portrait
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={6} lg={3}>
                            <IconButton onClick={showAllGenderChart} sx={{ p: 0 }}>
                                <Paper
                                    className='PortraitPaper'
                                    id='button1'
                                    sx={{
                                        p: 5,
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
                                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M33.872 30.1587C33.872 22.1653 27.3965 15.6619 19.4361 15.6619C17.3833 15.6619 15.4295 16.0944 13.6598 16.8732C8.56659 19.1149 5 24.2265 5 30.1587C5 37.4207 10.35 43.4352 17.2971 44.4785V48.5435H13.9335V52.839H17.2971V57H21.5745V52.839H24.9391V48.5435H21.5745V44.4785C28.5217 43.4354 33.872 37.4208 33.872 30.1587Z" fill="#E4E4FF" stroke="#475D89" strokeWidth="2" strokeMiterlimit="10" strokeLinejoin="round" />
                                                <path d="M19.436 40.381C25.0969 40.381 29.686 35.8045 29.686 30.159C29.686 24.5136 25.0969 19.937 19.436 19.937C13.7751 19.937 9.186 24.5136 9.186 30.159C9.186 35.8045 13.7751 40.381 19.436 40.381Z" stroke="#475D89" strokeWidth="2" strokeMiterlimit="10" />
                                                <path d="M50.9015 18.6782L53.6292 13.8044L55.1867 16.8818L59 14.9355L54.9841 7L46.1459 7.68073L46.4729 11.9636L49.9005 11.6998L47.1727 16.5736C40.6075 14.065 33.009 16.6757 29.4659 23.0063C25.5659 29.9747 28.038 38.8301 34.9775 42.7468C41.917 46.6634 50.7351 44.1802 54.635 37.2119C58.1782 30.8812 56.4486 23.0058 50.9015 18.6782Z" fill="#E4E4FF" stroke="#475D89" strokeWidth="2" strokeMiterlimit="10" strokeLinejoin="round" />
                                                <path d="M50.984 35.1163C48.211 40.0366 41.9635 41.7836 37.0297 39.0182C32.0959 36.2528 30.3442 30.0221 33.1172 25.1018C35.8901 20.1814 42.1377 18.4344 47.0715 21.1998C52.0052 23.9654 53.757 30.1959 50.984 35.1163Z" stroke="#475D89" strokeWidth="2" strokeMiterlimit="10" />
                                                <path d="M36.9666 36.5118H24.3385C23.92 36.5118 23.5808 36.1726 23.5808 35.7541V26.1754C23.5808 25.7569 23.92 25.4177 24.3385 25.4177H36.9666C37.3851 25.4177 37.7243 25.7569 37.7243 26.1754V35.7541C37.7243 36.1726 37.3851 36.5118 36.9666 36.5118Z" fill="#E4E4FF" stroke="#475D89" strokeWidth="2" strokeMiterlimit="10" />
                                                <path d="M26.499 29.0551H34.806" stroke="#475D89" strokeWidth="2" strokeMiterlimit="10" />
                                                <path d="M26.499 32.874H34.806" stroke="#475D89" strokeWidth="2" strokeMiterlimit="10" />
                                            </svg>

                                        </div>
                                        <div className='RealTimeVisitorPaperLeft'>
                                            <div className='PortaitText'>Gender Ratio{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</div>
                                        </div>
                                    </Stack>
                                </Paper>
                            </IconButton>
                        </Grid>
                        {/* Chart */}
                        <Grid item xs={12} md={6} lg={3}>
                            <IconButton onClick={showSevenDaysGenderChart} sx={{ p: 0 }}>
                                <Paper
                                    className='PortraitPaper'
                                    id='button2'
                                    sx={{
                                        p: 5,
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
                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_54_280)">
                                                    <path d="M7.5 12.5H2.5V52.5C2.5 55.25 4.75 57.5 7.5 57.5H47.5V52.5H7.5V12.5ZM52.5 2.5H17.5C14.75 2.5 12.5 4.75 12.5 7.5V42.5C12.5 45.25 14.75 47.5 17.5 47.5H52.5C55.25 47.5 57.5 45.25 57.5 42.5V7.5C57.5 4.75 55.25 2.5 52.5 2.5ZM52.5 42.5H17.5V7.5H52.5V42.5ZM32.5 37.5L42.5 17.5V12.5H27.5V17.5H37.5L27.5 37.5H32.5Z" fill="black" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_54_280">
                                                        <rect width="60" height="60" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </div>
                                        <div className='RealTimeVisitorPaperLeft'>
                                            <div className='PortaitText'>Gender Ration in 7 Days</div>
                                        </div>
                                    </Stack>
                                </Paper>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <IconButton onClick={showAgeChart} sx={{ p: 0 }}>
                                <Paper
                                    className='PortraitPaper'
                                    id='button3'
                                    sx={{
                                        p: 5,
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
                                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M39.6177 36.6522C39.1013 37.3471 38.493 37.9688 37.8094 38.5H38.125C39.5501 38.5016 40.9163 39.0684 41.9239 40.0761C42.9316 41.0837 43.4984 42.45 43.5 43.875V56.5H20.5V43.875C20.5016 42.45 21.0684 41.0837 22.0761 40.0761C23.0837 39.0684 24.4499 38.5016 25.875 38.5H26.1905C25.507 37.9688 24.8987 37.3471 24.3823 36.6522C22.7216 36.9978 21.2304 37.9044 20.1593 39.2196C19.0881 40.5349 18.5022 42.1788 18.5 43.875V56.8626C18.5005 57.2967 18.6732 57.7129 18.9802 58.0199C19.2871 58.3268 19.7033 58.4995 20.1374 58.5H43.8625C44.2967 58.4995 44.7129 58.3268 45.0198 58.0199C45.3268 57.7129 45.4995 57.2967 45.5 56.8626V43.875C45.4978 42.1788 44.9119 40.5349 43.8407 39.2196C42.7696 37.9044 41.2784 36.9978 39.6177 36.6522Z" fill="black" />
                                                <path d="M24.5 31C24.5 32.4834 24.9399 33.9334 25.764 35.1668C26.5881 36.4002 27.7594 37.3614 29.1299 37.9291C30.5003 38.4968 32.0083 38.6453 33.4632 38.3559C34.918 38.0665 36.2544 37.3522 37.3033 36.3033C38.3522 35.2544 39.0665 33.918 39.3559 32.4632C39.6453 31.0083 39.4968 29.5003 38.9291 28.1299C38.3614 26.7594 37.4001 25.5881 36.1668 24.764C34.9334 23.9399 33.4834 23.5 32 23.5C30.0116 23.5023 28.1052 24.2932 26.6992 25.6992C25.2931 27.1052 24.5023 29.0116 24.5 31ZM32 25.5C33.0878 25.5 34.1512 25.8226 35.0556 26.4269C35.9601 27.0313 36.6651 27.8903 37.0813 28.8952C37.4976 29.9002 37.6065 31.0061 37.3943 32.073C37.1821 33.1399 36.6583 34.1199 35.8891 34.8891C35.1199 35.6583 34.1399 36.1821 33.073 36.3943C32.0061 36.6065 30.9002 36.4976 29.8952 36.0813C28.8902 35.6651 28.0313 34.9601 27.4269 34.0556C26.8226 33.1512 26.5 32.0878 26.5 31C26.5016 29.5418 27.0816 28.1438 28.1127 27.1127C29.1438 26.0816 30.5418 25.5017 32 25.5ZM2 32.5C2.00269 30.1139 2.95176 27.8263 4.63901 26.139C6.32625 24.4518 8.61388 23.5027 11 23.5H12.057C11.0477 23.0262 10.1201 22.3951 9.30881 21.6303C6.71712 22.037 4.35564 23.3553 2.6492 25.3479C0.942764 27.3405 0.00336531 29.8766 0 32.5L0 44.5C0.000606092 45.0303 0.211514 45.5386 0.586456 45.9135C0.961397 46.2885 1.46975 46.4994 2 46.5H16.5V44.5H2V32.5ZM20.943 23.5H22C23.1691 23.5 24.3269 23.7292 25.4078 24.1746C25.9511 23.6511 26.5546 23.1939 27.2055 22.8124C26.1083 22.222 24.9181 21.8236 23.6864 21.6346C22.8763 22.3975 21.9503 23.0271 20.943 23.5ZM25 14C25 12.3189 24.5015 10.6755 23.5675 9.27766C22.6335 7.87984 21.306 6.79037 19.7528 6.14703C18.1996 5.50368 16.4906 5.33535 14.8417 5.66333C13.1929 5.9913 11.6783 6.80085 10.4896 7.9896C9.30085 9.17834 8.4913 10.6929 8.16333 12.3417C7.83535 13.9906 8.00368 15.6996 8.64702 17.2528C9.29037 18.806 10.3798 20.1335 11.7777 21.0675C13.1755 22.0015 14.8189 22.5 16.5 22.5C18.7536 22.4975 20.9141 21.6012 22.5076 20.0076C24.1011 18.4141 24.9975 16.2536 25 14ZM16.5 20.5C15.2144 20.5 13.9577 20.1188 12.8888 19.4046C11.8199 18.6903 10.9868 17.6752 10.4948 16.4874C10.0028 15.2997 9.87409 13.9928 10.1249 12.7319C10.3757 11.471 10.9948 10.3129 11.9038 9.40381C12.8128 8.49477 13.971 7.8757 15.2319 7.6249C16.4928 7.3741 17.7997 7.50282 18.9874 7.99479C20.1752 8.48676 21.1903 9.31988 21.9046 10.3888C22.6188 11.4577 23 12.7144 23 14C22.9981 15.7233 22.3127 17.3755 21.0941 18.5941C19.8755 19.8127 18.2233 20.4981 16.5 20.5ZM42 23.5H43.057C42.0497 23.0271 41.1237 22.3975 40.3136 21.6346C39.0819 21.8236 37.8917 22.222 36.7945 22.8124C37.4454 23.1939 38.0489 23.6511 38.5922 24.1746C39.6731 23.7292 40.8309 23.5 42 23.5ZM54.6912 21.6303C53.8799 22.3951 52.9523 23.0262 51.943 23.5H53C55.3861 23.5027 57.6737 24.4518 59.361 26.139C61.0482 27.8263 61.9973 30.1139 62 32.5L62.0012 44.5H47.5V46.5H62C62.5302 46.4994 63.0386 46.2885 63.4135 45.9135C63.7885 45.5386 63.9994 45.0303 64 44.5V32.5C63.9966 29.8766 63.0572 27.3405 61.3508 25.3479C59.6444 23.3553 57.2829 22.037 54.6912 21.6303ZM47.5 22.5C49.1811 22.5 50.8245 22.0015 52.2223 21.0675C53.6202 20.1335 54.7096 18.806 55.353 17.2528C55.9963 15.6996 56.1646 13.9906 55.8367 12.3417C55.5087 10.6929 54.6992 9.17834 53.5104 7.9896C52.3217 6.80085 50.8071 5.9913 49.1583 5.66333C47.5094 5.33535 45.8004 5.50368 44.2472 6.14703C42.694 6.79037 41.3665 7.87984 40.4325 9.27766C39.4985 10.6755 39 12.3189 39 14C39.0025 16.2536 39.8989 18.4141 41.4924 20.0076C43.0859 21.6012 45.2464 22.4975 47.5 22.5ZM47.5 7.5C48.7856 7.5 50.0423 7.88122 51.1112 8.59545C52.1801 9.30968 53.0132 10.3248 53.5052 11.5126C53.9972 12.7003 54.1259 14.0072 53.8751 15.2681C53.6243 16.529 53.0052 17.6872 52.0962 18.5962C51.1872 19.5052 50.029 20.1243 48.7681 20.3751C47.5072 20.6259 46.2003 20.4972 45.0126 20.0052C43.8248 19.5133 42.8097 18.6801 42.0954 17.6112C41.3812 16.5423 41 15.2856 41 14C41.0019 12.2767 41.6873 10.6245 42.9059 9.40592C44.1245 8.18734 45.7767 7.50191 47.5 7.5Z" fill="black" />
                                            </svg>

                                        </div>
                                        <div className='RealTimeVisitorPaperLeft'>
                                            <div className='PortaitText'>Age Group{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</div>
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
                                    weight: "770px",
                                    boxShadow: "0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                                    backdropFilter: "blur(5.5px)",
                                    borderRadius: "30px",
                                    border: "3px solid rgba( 255, 255, 255, 0.18 )"
                                }}>
                                <PortraitAgeChart show={showAge} />
                                <PortraitGenderChartAll show={showAllGender} />
                                <PortraitGenderChartDays show={showSevenDaysGender} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider >
    )
}
export default PortraitContainer