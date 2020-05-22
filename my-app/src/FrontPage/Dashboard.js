import React from 'react'
import {
    BrowserRouter as Router,
    Route, Link, Switch
} from 'react-router-dom'
import Container from "react-bootstrap/Container";
import './Style.css';
import { Navbar } from 'react-bootstrap'
import userManage from "./userManage";
import jwtDecode from 'jwt-decode'
import ServicesGrid from './ServicesGrid';
import {MDBCardTitle, MDBCol, MDBJumbotron} from "mdbreact";
import puzzle from "../ressources/jigsaw.png";
import Areas from "./Areas";
import Aboutjson from "./Aboutjson";

var NavStyle = {
    margin: "10px",
    color : "white"
};

var NavStyle2 = {
    margin: "40px"
}

const NavHome = (props) => {
    const {name, email, password, token, id} = props;
    return (
            <Router>
                <Navbar expand="lg" style={{backgroundColor : "#9723E5"}} variant="dark">
                    <Container>
                        <Navbar.Brand href={'/Dashboard'}>
                            <strong style={NavStyle2}>Welcome {name}</strong>
                            <Link to={'/about.json'}><a style={NavStyle}>About</a></Link>
                            <Link to={{pathname:'/Areas', Param:{id : id}}}><a style={NavStyle}> Areas</a></Link>
                            <Link to="./client.apk" download target="_blank"><a style={NavStyle}>.Apk</a></Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <Link to={{pathname:'/userManage', Param:{name : name, password : password, email : email, token : token}}}><a style={{color :'white'}}>Settings</a></Link>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <MDBJumbotron style={{backgroundColor:"#9723E5"}}>
                    <MDBCol className="text-white text-center">
                    <MDBCardTitle className="h1-responsive font-bold">Choose your actions and reactions  <img src={puzzle}/></MDBCardTitle>
                    </MDBCol>
                </MDBJumbotron>
                <Switch>
                    <Route path='/userManage' component={userManage}></Route>
                    <Route path='/Dashboard' component={ServicesGrid}></Route>
                    <Route path='/Areas' component={Areas}></Route>
                    <Route path='/about.json' component={Aboutjson}></Route>
                </Switch>
            </Router>
    )
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            email :'',
            token : '',
            id : ''
        }
    }

    componentDidMount() {
        const tokken = localStorage.token;
        const decode = jwtDecode(tokken);

        this.setState({
            id : decode._id,
            name : decode.name,
            email : decode.email,
            password : decode.password,
            token : tokken
        })

    }
    render() {
        return (
        <div className="Dashboard">
            <NavHome
                name={this.state.name}
                email={this.state.email}
                password={this.state.password}
                token={this.state.token}
                id={this.state.id}
            />
        </div>
        )
    }
}

export default Dashboard;
