import React from "react";
import VenueContainer1 from "../../components/Venue/VenueContainer1";
import Fade from '@mui/material/Fade';
import "./index.css"

class Venue1 extends React.Component {
    render() {
        return (
            <Fade in={true}>
            <div className="admin_Venue1">
                <VenueContainer1></VenueContainer1> 
            </div>
            </Fade>
        )
    }
};
export default Venue1;