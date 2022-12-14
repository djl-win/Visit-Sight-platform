import React from 'react';
import HistoryContainer from "../../components/History/HistoryContainer";
import Fade from '@mui/material/Fade';

class History extends React.Component {
    render() {
        return (
            <Fade in={true}>
                <div className="admin_History">
                    <HistoryContainer></HistoryContainer>
                </div>
            </Fade>
        )
    }
}

export default History;