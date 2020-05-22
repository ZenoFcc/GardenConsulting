import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

const FaireJolieLeCode = (props) => {
    const {name, email} = props;
    return(
        <div style={{color : 'black'}}>
        <h1 style={{color : 'black'}}><strong>Public profil</strong></h1>
        <br/>
        <br/>
        <h3 style={{color : 'black'}}><strong>Name : </strong></h3>
            <h4 style={{color : 'black'}}>{name}</h4>
        <br/>
        <h3 style={{color : 'black'}}><strong>Email : </strong></h3>
            <h4 style={{color : 'black'}} >{email}</h4>
        <br/>
        <h3 style={{color : 'black'}}><strong>Password : </strong></h3>
            <h4 type="password" style={{color : 'black'}}>********</h4>
        </div>
    )
}

export default class userManager extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        name : props.location.Param.name,
        password : props.location.Param.password,
        email : props.location.Param.email,
        token : props.location.Param.token
    };
    }

    logout(e) {
        e.preventDefault();
        localStorage.removeItem('token');
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <br/>
                        <br/>
                        <FaireJolieLeCode
                        name={this.state.name}
                        email={this.state.email}
                        password={this.state.password}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBBtn onClick={this.logout} color="red">Logout</MDBBtn>
            </MDBContainer>
        )
    }
}
