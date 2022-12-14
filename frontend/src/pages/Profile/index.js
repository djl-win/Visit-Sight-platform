import React from "react";
import { storageUtils } from "../../utils/storageUtils"
import Slide from '@mui/material/Slide';

class Profile extends React.Component {

  render() {
    const adminInfo = storageUtils.getUser();
    return (
      <Slide in={true} mountOnEnter unmountOnExit>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40% 60%",
          maxWidth: "500px",
          height: "350px",
          background:
            "linear-gradient(-45deg,rgba( 255, 255, 255, 0.1 ),rgba( 255, 255, 255, 0.4 ))",
          boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 4px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
          margin: "auto",
          marginTop: "140px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={localStorage.getItem("avatar")}
            alt="profile_img"
            style={{
              height: "140px",
              width: "140px",
              marginLeft: "10px",
              boxShadow: "0 0 42px 0 rgba( 255, 255, 255, 0.17 )",
              background: "rgba( 255, 255, 255, 0.25 )",
              backdropFilter: "blur( 4px )",
              border: "3px solid rgba( 255, 255, 255, 0.18 )",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "50% 10%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "black",
              borderBottom: "2px solid rgba(255,255,255,0.2)",
              padding: "0 40px",
            }}
          >
            <h3>Name :</h3> {adminInfo.peopleName}&nbsp;
            <h3>Gender :</h3> {
                 (adminInfo.peopleGender === 1 && 'Boy')|| (adminInfo.peopleGender === 2 && 'Girl')
              }&nbsp;
            <h3>Age :</h3>{adminInfo.peopleAge}&nbsp;
            <h3>Email :</h3>{adminInfo.peopleEmail}&nbsp;
            <h3>Phone :</h3>{adminInfo.peoplePhone}&nbsp;
          </div>
        </div>
      </div>
      </Slide>
    );
  };
}

export default Profile;
