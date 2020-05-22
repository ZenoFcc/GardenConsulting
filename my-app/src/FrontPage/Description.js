import React, { Component } from 'react'
import './Style.css';
import {Link, Redirect} from "react-router-dom";
import {
    MDBJumbotron,
    MDBBtn,
    MDBContainer,
    MDBRow, MDBCol,
    MDBCardTitle
} from "mdbreact";
import Nav from './Navbar';
import {GoogleLogin} from "react-google-login";
import apiimage from "../ressources/api.png";
import title from "../ressources/transfer.png";
import { GoogleLogout } from 'react-google-login';

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
        this.responseGoogle = this.responseGoogle.bind(this);
        this.NotResponse = this.NotResponse.bind(this);
    }
    NotResponse = (response, err) => {
        console.log("err");
    }
    responseGoogle = (response) => {
        console.log(response);
        if (response) {
            this.setState({isLogin:true});
        }
    }

    render() {
        const { isLogin } = this.state;
        if (isLogin === true) {
            return ( <Redirect to={"./Dashboard"}/>)
        }
        return (
            <div>
                 <Nav/>
                <MDBJumbotron style={{backgroundColor:"#9723E5"}}>
                    <MDBCol className="text-white text-center">
                            <img src={title}/>
                            <br/>
                            <br/>
                    </MDBCol>
                </MDBJumbotron>
                <br/>
                <br/>
                <br/>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol size="7" style={{right: "20%"}}>
                                <br/>
                                <br/>
                                <br/>
                            </MDBCol>
                            <MDBCol size="5">
                                <MDBRow>
                                    <MDBCol size="3">
                                        <Link to='/Login'><MDBBtn color="btn btn-outline-purple" className="text-monospace">Login</MDBBtn></Link>
                                    </MDBCol>
                                    <MDBCol>
                                        <Link to='/register'><MDBBtn color="btn btn-outline-purple" className="text-monospace">Sign Up</MDBBtn></Link>
                                    </MDBCol>
                                </MDBRow>
                                <div className="github">
                                    <GoogleLogin
                                        clientId="316488850433-a8bhhdoqqdmgnttj75hd8rt5hv63ehu7.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.NotResponse}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                    <GoogleLogout
                                        clientId="316488850433-a8bhhdoqqdmgnttj75hd8rt5hv63ehu7.apps.googleusercontent.com"
                                        buttonText="Logout"
                                    >
                                    </GoogleLogout>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
            </div>
        );
    }
}

export default Description;


