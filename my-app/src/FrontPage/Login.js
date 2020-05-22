import React, { Component } from 'react'
import {MDBBtn, MDBContainer, MDBRow, MDBCol} from "mdbreact";
import axios from "axios";
import Nav from './Navbar';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            isLogin: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    isAuthenticated() {
        return this.isLogin
    }

    handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(newUser);
        axios.post("http://localhost:8080/users/login", newUser)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                this.props.history.push('/Dashboard')
            }, (error) => {
                console.log(error);
            });
    }
    render() {
        return(
            <div>
             <Nav/>
            <form class="text-center border border-light p-5" action="#!">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <form onSubmit={this.handleSubmit} >
                                <p className="h4 text-center mb-4" >Sign in</p>
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="defaultFormLoginEmailEx"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                                <br />
                                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                    Your password
                                </label>
                                <input
                                    type="password"
                                    id="defaultFormLoginPasswordEx"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                                <div className="text-center mt-4">
                                    <MDBBtn color="secondary" type="submit">Login</MDBBtn>
                                    <div>{this.state.data}</div>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </form>
        </div>

        );
    }
}
export default Login;
