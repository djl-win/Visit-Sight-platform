
import React from "react";
import ChartCon from "../../components/DashboardCom/DashContainer";
import "./index.css"
import Fade from '@mui/material/Fade';

class Dashboard extends React.Component {
    render() {
        return (
            <Fade in={true}>
                <div className="admin_Dashboard">
                    <ChartCon></ChartCon>
                </div>
            </Fade>
        )
    }
};
export default Dashboard;