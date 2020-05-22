import React, { Component } from 'react';
import axios from 'axios';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class LoginModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            username: '',
            password: ''
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        alert(this.props.request)
        await axios.post(this.props.request, {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            console.log(res.status)
        })
        .catch(err => {
            this.setState({ responseToLogin: "No account found for the user : \"" + this.state.username + "\"" })
        })
    }

    render() {
        return (
            <MDBContainer>
            <MDBBtn
                color="elegant"
                onClick={this.toggle}
            >Login</MDBBtn>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                <MDBModalHeader toggle={this.toggle}>Please login to this service</MDBModalHeader>
                <MDBModalBody>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                        Your email
                        </label>
                        <input
                        onChange={e => this.setState({ username: e.target.value })}
                        id="defaultFormLoginEmailEx"
                        className="form-control"
                        />
                        <br />
                        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                        Your password
                        </label>
                        <input
                        onChange={e => this.setState({ password: e.target.value })}
                        type="password"
                        autoComplete="password"
                        id="defaultFormLoginPasswordEx"
                        className="form-control"
                        />
                        <div className="text-center mt-4">
                        <MDBBtn
                                color="elegant"
                                type="submit"
                        >Login</MDBBtn>
                        </div>
                    </form>
                </MDBModalBody>
                <MDBModalFooter>
                    <h2>{this.props.service}</h2>
                </MDBModalFooter>
            </MDBModal>
            </MDBContainer>
        );
    }
}

export default LoginModal;