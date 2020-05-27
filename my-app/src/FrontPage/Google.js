import React from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import GoogleLogo from '../ressources/chrome.png';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCol,
    MDBModal,
    MDBModalBody, MDBModalFooter,
    MDBModalHeader,
} from "mdbreact";


const cardStyle = {
    width: "250px"
}

class ModalGoogle extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            modal : false,
            action : '',
            reaction: '',
            id : this.props.id
        }
        this.handleChangeAction = this.handleChangeAction.bind(this);
        this.handleChangeReaction = this.handleChangeReaction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    handleChangeAction = (e) => {
        this.setState({action: e.target.value});
    };

    handleChangeReaction = (e) => {
        this.setState({reaction: e.target.value});
    };

    async handleSubmit(e) {
        e.preventDefault();
        const Area = {
            action : this.state.action,
            reaction : this.state.reaction,
            id : this.state.id
        };
        await axios.post("http://localhost:8080/google/recArea", Area)
            .then((response) => {
                console.log(response);
                if (response.status === 400) {
                    alert("Choose area");
                }
                else if (response.status === 200) {
                    alert("Area done");
                }
            })
    }

    render() {
        return (
            <div>
                <MDBBtn color="green" >Connected</MDBBtn>
                <form onSubmit={this.handleSubmit}>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>List of actions and reactions</MDBModalHeader>
                        <MDBModalBody>
                            <h4>If</h4>
                            <select value={this.state.action} onChange={this.handleChangeAction} className="browser-default custom-select">
                                <option value="Action">Action</option>
                                <option value="Chirab">Olivier Chane send me an Email</option>
                                <option value="mailDelete">I Delete an Email</option>
                            </select>
                            <br/>
                            <br/>
                            <h4>Then</h4>
                            <select value={this.state.reaction} onChange={this.handleChangeReaction} className="browser-default custom-select">
                                <option value="Reaction">Reaction</option>
                                <option value="Gmail">Delete the last email</option>
                            </select>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn color="primary" type="submit" value="Submit" >Create Area</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </form>
            </div>
        )
    }
}

class GooglekWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            isLogin : false
        };
        this.sendToken = this.sendToken.bind(this);
    }

    componentDidMount() {
        const tokken = localStorage.token;
        const decode = jwtDecode(tokken);

        this.setState({
            id : decode._id,
        })
        const newInfo = {
            id : decode._id,
        }
        axios.post("http://localhost:8080/google/checkTokken", newInfo)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({isLogin : true})
                }
            })
            .catch(err => console.log(err));
    }

    async sendToken(e) {
        e.stopPropagation();
        const id = {
            id: this.state.id
        };
        axios.post("http://localhost:8080/google/catchId", id)
            .then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    console.log("go lancer une modal");
                    this.setState({isLogin : true})
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { isLogin } = this.state;
        let elem;

        if (isLogin === true) {
            elem = <ModalGoogle
                id={this.state.id}
            />;
        }
        else {
            elem = <MDBBtn color="btn btn-outline-purple"><a href={this.props.links} onClick={(e) => this.sendToken(e)}
                                              style={{color: "purple"}}>Connect</a></MDBBtn>;
        }
        return (
            <MDBCol>
                <MDBCard style={cardStyle}>
                    <MDBCardImage className="img-fluid" src={GoogleLogo} waves />
                    <MDBCardBody>
                        <MDBCardTitle>Google</MDBCardTitle>
                        {elem}
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default GooglekWidget;
