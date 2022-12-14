import * as React from 'react';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import VisitorTable from "./VisitorTable";



const VisitorsContainer = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
        contrastText: "000000"
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

          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>
            {/* Grid - Box as container for page name */}
            <Grid item xs={12}>
              <Box  sx={{ display: 'flex', alignItems: 'end'}}>
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
                  Visitors
                </Typography>
              </Box>          
            </Grid>
            {/* Grid - Box as container for visitor table */}
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
                  width: "1500px",
                  boxShadow: "0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                  backdropFilter: "blur(5.5px)",
                  borderRadius: "30px",
                  border: "3px solid rgba( 255, 255, 255, 0.18 )"
                }}>
                  <VisitorTable/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
    </ThemeProvider>
  );
}

export default VisitorsContainer