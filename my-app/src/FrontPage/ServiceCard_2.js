import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBBtn} from 'mdbreact';
import axios from 'axios';
import jwtDecode from "jwt-decode";
const cardStyle = {
    width: "250px"
}

class ServiceCard_2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            api : this.props.api,
            isLog : false,
            title : this.props.title
        };
        this.sendToken = this.sendToken.bind(this);

    }

    componentDidMount() {
        const tokken = localStorage.token;
        const decode = jwtDecode(tokken);

        console.log(decode._id);
        this.setState({
            id : decode._id,
        })
    }

        sendToken(e) {
        e.stopPropagation();
        const id = {
            id: this.state.id
        };
        axios.post(this.state.api, id)
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
        if (isLogin === true) {
            return (
                <MDBBtn>Connected</MDBBtn>
            )
        }
        return (
            <MDBCol>
                <MDBCard style={cardStyle}>
                    <MDBCardImage className="img-fluid" src={this.props.logo} waves />
                    <MDBCardBody>
                        <MDBCardTitle>{this.props.title}</MDBCardTitle>
                        <MDBBtn color="elegant"><a href={this.props.links}  onClick={(e)=>this.sendToken(e)} style={{color: "white"}}>Connect</a></MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default ServiceCard_2;
