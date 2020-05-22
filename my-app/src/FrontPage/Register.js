import React  from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import Nav from './Navbar';


import { MDBBtn, MDBContainer, MDBRow, MDBCol} from "mdbreact";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            isRegister:false,
            data: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.receiveData = this.receiveData.bind(this);

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
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


    handleSubmit(e) {
        e.preventDefault();
        var _data = this;
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        console.log(newUser);
        axios.post("http://localhost:8080/users/register", newUser)
            .then((response) => {
                const obj = JSON.stringify(response.data);
                const ob1 = JSON.stringify(response.data.message);
                console.log(ob1);
                _data.receiveData(ob1);
                const res = JSON.parse(obj);
                if (res.status === 200) {
                    this.setState({isRegister:true});
                }
                else if (res.status === 400) {
                    this.setState({isRegister: false});
                }
            }, (error) => {
                console.log(error);
            });
    }
    receiveData(data) {
        this.setState({data});
    }

    render() {
        const { isRegister } = this.state;
        if (isRegister === true) {
            return( <Redirect to={"/Login"}/>);
        }
        return(
            <div>
                <Nav/>
            <form class="text-center border border-light p-5" action="#!">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                    Your Name
                                </label>
                                <input
                                    placeholder="Type your name"
                                    type="name"
                                    name="name"
                                    id="defaultFormRegisterNameEx"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                />
                                <br />
                                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                    Your email
                                </label>
                                <input
                                    placeholder="Type email"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    id="defaultFormRegisterEmailEx"
                                    className="form-control"
                                    onChange={this.onChangeEmail}
                                />
                                <br />
                                <label
                                    htmlFor="defaultFormRegisterPasswordEx"
                                    className="grey-text"
                                >
                                    Your password
                                </label>
                                <input
                                    placeholder="Type password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    id="defaultFormRegisterPasswordEx"
                                    className="form-control"
                                    onChange={this.onChangePassword}
                                />
                                <div className="text-center mt-4">
                                    <MDBBtn color="secondary" type="submit">
                                        Register
                                        <div>{this.state.data}</div>
                                    </MDBBtn>
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
export default Register;


//widget meteo, bourse, ratp
