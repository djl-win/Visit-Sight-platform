import React from "react";
import VenueContainer2 from "../../components/Venue/VenueContainer2";
import Fade from '@mui/material/Fade';
import "./index.css"

class Venue2 extends React.Component {
    render() {
        return (
            <Fade in={true}>
            <div className="admin_Venue2">
                <VenueContainer2></VenueContainer2> 
            </div>
            </Fade>
        )
    }
};
export default Venue2;