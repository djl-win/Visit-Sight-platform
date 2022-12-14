import React from "react";
import VenueContainer3 from "../../components/Venue/VenueContainer3"
import Fade from '@mui/material/Fade';
import "./index.css"

class Venue3 extends React.Component {
    render() {
        return (
            <Fade in={true}>
            <div className="admin_Venue3">
                <VenueContainer3></VenueContainer3> 
            </div>
            </Fade>
        )
    }
};
export default Venue3;