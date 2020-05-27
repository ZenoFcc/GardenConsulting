import React, { Component } from 'react'
import '../App.css';
import { Navbar } from 'react-bootstrap'
import './Style.css';
import Container from "react-bootstrap/Container";

class Nav extends Component {
    render() {
        return (
            <Navbar style={{backgroundColor : "#9723E5"}} expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href={'/#home'} style={{fontSize : "180%"}}><strong>Stage Garden Consulting</strong></Navbar.Brand>
                </Container>
            </Navbar>
        );
    }
}

export default Nav;
