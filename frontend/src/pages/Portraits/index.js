import React from "react";
import Fade from '@mui/material/Fade';
import PortraitContainer from "../../components/Portrait/PortraitContainer";
import "./index.css"


class Portraits extends React.Component {
    render() {
        return (
            <Fade in={true}>
            <div className="admin_Portrait">
                <PortraitContainer></PortraitContainer> 
            </div>
            </Fade>
        )
    }
};
export default Portraits;