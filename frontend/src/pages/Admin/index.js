import React from "react";
import './index.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import MySidebar from "../../components/Admin/MySidebar";
import Header from "../../components/Admin/Header";
import Footer from "../../components/Admin/Footer";
import Dashboard from "../Dashboard";
import Venue1 from "../Venue1"
import Venue2 from "../Venue2"
import Venue3 from "../Venue3"
import Portraits from "../Portraits"
import History from "../History"
import Comments from "../Comments"
import Visitors from "../Visitors"
import Setting from "../Setting"
import { storageUtils } from "../../utils/storageUtils"
import { error } from '../../utils/message.js'
import Profile from "../Profile";
import Box from '@mui/material/Box';


class Admin extends React.Component {


    render() {

        //log in verification
        const user = storageUtils.getUser();

        // if there is no user store in storage, then post error and jump to login page
        if (!user || !user.peopleId) {
            error("Please login, then to asscess this system!")
            return <Redirect to='/login' />

        }


        return (
            <div className="admin_page">
                <Box sx={{ display: 'flex' }}>
                    <Header></Header>
                    <MySidebar></MySidebar>
                    <Footer></Footer>
                </Box>
                
                <Switch>
                    <Route path="/Profile" component={Profile} />
                    <Route path="/Dashboard" component={Dashboard} />
                    <Route path="/Venue1" component={Venue1} />
                    <Route path="/Venue2" component={Venue2} />
                    <Route path="/Venue3" component={Venue3} />
                    <Route path="/Portraits" component={Portraits}/>\
                    <Route path="/History" component={History}/>
                    <Route path="/Comments" component={Comments}/>
                    <Route path="/Visitors" component={Visitors}/>
                    <Route path="/Setting" component={Setting}/>
                    <Redirect to="/Dashboard" />
                </Switch>
            </div>
        )
    }
};
export default Admin;