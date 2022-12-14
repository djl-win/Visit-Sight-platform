import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import ChatBot from 'react-simple-chatbot';

const Footer = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'chatbot-popover' : undefined;

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

        chatbot: {
            background: "#f5f8fb",
            fontFamily: "Nunito Sans",
            headerBgColor: "#56A5EC",
            headerFontColor: "#fff",
            headerFontSize: "15px",
            botBubbleColor: "#448aff",
            botFontColor: "#fff",
            userBubbleColor: "#fff",
            userFontColor: "#4A4344"
        },



    });

    const steps = [
        {
          id: "1",
          message: "Do you have any question?",
          trigger: "2"
        },
        {
          id: "2",
          options: [
            { value: 1, label: "yes!", trigger: "3" },
            { value: 2, label: "no!", trigger: "11" }
          ]
        },
        {
          id: "3",
          message: "Which page you are confused?",
          trigger: "4"
        },
        {
          id: "4",
          options: [
            { value: 1, label: "Dashboard", trigger: "5" },
            { value: 2, label: "Venue", trigger: "8" },
            { value: 3, label: "Analytics", trigger: "9"}
          ]
        },
        {
            id: "5",
            message: "The Dashboard page contains the real time visitor and daily total visitor, as admin you can also edit the availability of car spot.",
            trigger: "6"
        },
        {
            id: "10",
            options: [
                { value: 1, label: "yes!", trigger: "1" },
                { value: 2, label: "no!", trigger: "7" }
                ]
        },
        {
            id: "7",
            message: "Please contact Jiale",
            trigger: "11"
        },
        {
            id: "8",
            message: "The Venue pages contains the real time visitor and daily total visitor for each venue, as admin you can also edit the capacity of each venue.",
            trigger: "6"
        },
        {
            id: "9",
            message: "The Analytics pages contains Portraits, history, Comments, Visitors and setting page, which provide insight for museum's operation. As admin you can also update your profile",
            trigger: "6"
        },
        {
            id: "6",
            message: "Do this solve you problem?",
            trigger: "10"
        },
        {
            id: "11",
            message: "Thank you, your are welcome!",
            end: true
        }
      ];

    return (
        
        <ThemeProvider theme={theme} >
            <footer
            style ={{
                position: 'absolute',
                bottom: 0,
                left: 30,
                right: 0,
                Width: "100%",
            }}>
                    <div style ={{
                        float: "right"
                    }}>
                        <Button variant="contained" onClick={handleClick}>
                            Any Question?
                            </Button>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                            >   
                                <ThemeProvider theme={theme.chatbot}>
                                    <ChatBot 
                                    headerTitle="Customer Team"
                                    steps={steps} />
                                </ThemeProvider>
                                
                            </Popover>
                    </div>

            </footer>

        </ThemeProvider>
    );

}

export default Footer
