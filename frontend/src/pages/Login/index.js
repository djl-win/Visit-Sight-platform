import * as React from "react";
import './index.css';
import loginImg from "./img/login.svg";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reqLogin, reqRegister, reqCheckCode, reqAdminInfo } from '../../api'
import { success, error, warn } from '../../utils/message.js'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { storageUtils } from "../../utils/storageUtils"

class Login extends React.Component {
  state = {

    //page switch between register and login
    showRegisterPage: 'none',
    showLoginPage: 'block',

    //info that contain in the form
    field: {
      adminUsername: '',
      adminPassword: '',
      peopleName: '',
      peopleGender: '1',
      peopleAge: '',
      peopleEmail: '',
      peoplePhone: '',
    },

    //the verification code box was default as not invisible
    smsVisible: false,

    //verification code
    smsCode: '',

    //error message
    errors: {}

  }

  //remove user in storage when reloading page
  componentDidMount() {
    localStorage.removeItem("avatar")
    storageUtils.removeUser();
  }

  //open the verification dialog
  handleOpen = () => {
    this.setState({
      smsVisible: true,
      smsCode: ''
    })
  };

  //close the verification dialog
  handleClose = () => {
    this.setState({
      smsVisible: false,
      smsCode: ''
    })
  }

  //clear the from data
  handleCleanFormData = () => {
    this.setState({
      field: {
        adminUsername: '',
        adminPassword: '',
        peopleName: '',
        peopleGender: '1',
        peopleAge: '',
        peopleEmail: '',
        peoplePhone: '',
      }
    })
  };

  //switch between register page and login page
  handlePageRegister = () => {
    this.setState({
      showRegisterPage: 'block',
      showLoginPage: 'none'
    });
    this.handleCleanFormData();
  };

  handlePageLogin = () => {
    this.setState({
      showRegisterPage: 'none',
      showLoginPage: 'block'
    });
    this.handleCleanFormData();
  };

  handleChange = e => {

    const { field } = this.state;
    field[e.target.name] = e.target.value;
    this.setState({ field });
  };

  //log in 
  handleLogin = async (event) => {
    //1. hold the post req
    event.preventDefault();

    //2. verification
    const adminUsername = this.state.field.adminUsername;
    const adminPassword = this.state.field.adminPassword;
    const passValid =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (adminUsername === null || adminUsername === '') {
      warn("🦄 Please enter username!")
      return;
    } else if (adminPassword === null || adminPassword === '') {
      warn("🦄 Please enter password!")
      return;
    } else if (passValid.test(adminPassword) === false) {
      warn("🦄 password must contain minimum eight characters, at least one letter, one number and one special character!")
      return;
    }

    //3. send the req
    const response = await reqLogin(adminUsername, adminPassword);

    //4. process the req
    if (response.code === 200) {
      //verification
      success("🦄 Sms Verification Code: " + response.data);
      this.handleOpen();
    } else {
      error("🦄 " + response.msg);
      this.handleCleanFormData();
    }
  }

  //register
  handleRegister = async (event) => {
    // hold the post req
    event.preventDefault();
    //1. verification
    const adminUsername = this.state.field.adminUsername;
    const adminPassword = this.state.field.adminPassword;
    const peopleName = this.state.field.peopleName;
    const peopleGender = this.state.field.peopleGender;
    const peopleAge = this.state.field.peopleAge;
    const peopleEmail = this.state.field.peopleEmail;
    const peoplePhone = this.state.field.peoplePhone;
    const emailValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const phoneValid = /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;
    //Minimum eight characters, at least one letter, one number and one special character:
    const passValid =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const ageValid = /^[1-9][0-9]?$|^100$/;

    if (adminUsername === null || adminUsername === '') {
      warn("🦄 Please enter username!")
      return;
    } else if (adminPassword === null || adminPassword === '') {
      warn("🦄 Please enter password!")
      return;
    }else if (passValid.test(adminPassword) === false) {
      warn("🦄 password must contain minimum eight characters, at least one letter, one number and one special character!")
      return;
    } else if (peopleName === null || peopleName === '') {
      warn("🦄 Please enter name!")
      return;
    } else if (peopleAge === null || peopleAge === '') {
      warn("🦄 Please enter age!")
      return;
    } else if (ageValid.test(peopleAge) === false) {
      warn("🦄 Please enter valid age!")
      return;
    } else if (peopleEmail === null || peopleEmail === '') {
      warn("🦄 Please enter email!")
      return;
    } else if (emailValid.test(peopleEmail) === false) {
      warn("🦄 Please enter valid email!")
      return;
    } else if (peoplePhone === null || peoplePhone === '') {
      warn("🦄 Please enter phone!")
      return;
    } else if (phoneValid.test(peoplePhone) === false) {
      warn("🦄 Please enter valid phone number!")
      return;
    }
    //2. send the req
    // console.log(this.state.field)
    const response = await reqRegister(adminUsername, adminPassword, peopleName, peopleGender, peopleAge, peopleEmail, peoplePhone);

    //3. process the req
    if (response.code === 200) {
      // redirect to home page
      this.handlePageLogin();
      success("🦄 " + response.data)
    } else {
      error("🦄 " + response.msg)
    }

  };

  //verification code
  handleSmscode = async (event) => {
    event.preventDefault();

    //1.check the input code
    const smsCode = this.state.smsCode;
    if (smsCode === null || smsCode === '') {
      warn("🦄 Please enter smsCode!")
      return;
    }

    //2.send the req
    const response = await reqCheckCode(smsCode);

    //3.process the req and action based on response code
    if (response.code === 200) {

      //close dialog
      this.handleClose();

      //store user info into the local storage

      //1.get admin info
      const res = await reqAdminInfo();

      //2.store the user info
      if (res.code === 200) {
        storageUtils.saveUser(res.data)
      } else {
        error("🦄 " + response.msg);
      }

      localStorage.setItem("avatar", "https://api.multiavatar.com/goHD" + this.state.field.adminUsername + ".png")

      //clear form data
      this.handleCleanFormData();

      this.props.history.push('/')

      success("🦄 Welcome!")

    } else {
      error("🦄 " + response.msg);
      this.setState({
        smsCode: ''
      })
    }
  }

  render() {

    return (
      <div className="login">
        <div className="login-content">
          {/* <ToastContainer /> */}
          <div className="login-img">
            <img src={loginImg} alt="Login" />
          </div>
          <div className="login-forms">
            <form action="" className="login-registre" id="login-in" style={{ display: this.state.showLoginPage }}>
              <h1 className="login-title">Sign In</h1>

              <div className="login-box">
                <i className="bx bx-user login-icon"></i>
                <input
                  name="adminUsername"
                  onChange={this.handleChange}
                  value={this.state.field.adminUsername}
                  type="text" placeholder="Username"
                  className="login-input" />
              </div>

              <div className="login-box">
                <i className="bx bx-lock login-icon"></i>
                <input
                  name="adminPassword"
                  onChange={this.handleChange}
                  value={this.state.field.adminPassword}
                  type="password"
                  placeholder="Password"
                  className="login-input"
                />
              </div>

              <a onClick={this.handleLogin} className="login-button">Sign In</a>
              <div>
                <span className="login-account">Don't have an account? </span>
                <span onClick={this.handlePageRegister} className="login-signin" id="sign-up">Sign Up</span>
              </div>
            </form>

            <form className="login-create" id="login-up" style={{ display: this.state.showRegisterPage }}>
              <h1 className="login-title">Create Account</h1>

              <div className="login-box">
                <i className="bx bx-user login-icon"></i>
                <input
                  name="adminUsername"
                  onChange={this.handleChange}
                  value={this.state.field.adminUsername}
                  type="text"
                  placeholder="Username"
                  className="login-input" />
              </div>

              <div className="login-box">
                <i className="bx bx-lock-alt login-icon"></i>
                <input
                  name="adminPassword"
                  onChange={this.handleChange}
                  value={this.state.field.adminPassword}
                  type="password"
                  placeholder="Password"
                  className="login-input"
                />
              </div>

              <div className="login-box">
                <i className="bx bx-at login-icon"></i>
                <input
                  name="peopleName"
                  onChange={this.handleChange}
                  value={this.state.field.peopleName}
                  type="text"
                  placeholder="Name"
                  className="login-input" />
              </div>

              <div className="login-box">
                <i className="bx bx-at login-icon"></i>
                <select
                  name="peopleGender"
                  value={this.state.field.peopleGender}
                  onChange={this.handleChange}
                  className="login-input"
                >
                  <option value="1">Boy</option>
                  <option value="2">Girl</option>
                </select>
              </div>

              <div className="login-box">
                <i className="bx bx-at login-icon"></i>
                <input
                  name="peopleAge"
                  onChange={this.handleChange}
                  value={this.state.field.peopleAge}
                  type="text"
                  placeholder="Age"
                  className="login-input" />
              </div>

              <div className="login-box">
                <i className="bx bx-at login-icon"></i>
                <input
                  name="peopleEmail"
                  onChange={this.handleChange}
                  value={this.state.field.peopleEmail}
                  type="text"
                  placeholder="Email"
                  className="login-input" />
              </div>

              <div className="login-box">
                <i className="bx bx-at login-icon"></i>
                <input
                  name="peoplePhone"
                  onChange={this.handleChange}
                  value={this.state.field.peoplePhone}
                  type="text"
                  placeholder="Phone"
                  className="login-input" />
              </div>

              <a onClick={this.handleRegister} className="login-button">Sign Up</a>

              <div>
                <span className="login-account">Already have an account? </span>
                <span onClick={this.handlePageLogin} className="login-signup" id="sign-in">Sign In</span>
              </div>
            </form>
            <Dialog open={this.state.smsVisible}>
              <DialogTitle>Verification</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter the verification code within 120s
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Verification code"
                  fullWidth
                  variant="standard"
                  value={this.state.smsCode}
                  onChange={(e) => {
                    this.setState({
                      smsCode: e.target.value
                    })
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button onClick={this.handleSmscode}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
          {/* <ToastContainer /> */}
        </div>
      </div>
    );
  }
};

export default Login;