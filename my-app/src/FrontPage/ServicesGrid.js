import React from 'react';
import googleLogo from '../ressources/chrome.png';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import GooglekWidget from './Google';
import Reader from "./Upload";


class ServicesGrid extends React.Component {
    render () {
        return (
            <MDBContainer>
                <br/>
                <br/>
                <MDBRow>
                    <MDBCol>
                        <br/>
                        <br/>
                    <GooglekWidget
                        logo={googleLogo}
                        title={'Google'}
                        links={"https://accounts.google.com/o/oauth2/auth?scope=https://mail.google.com/&response_type=code&access_type=offline&redirect_uri=http://localhost:8080/google/oauth2/redirect&client_id=731881582218-blchfq09nd9f5j44ceooj2im3fqvgra8.apps.googleusercontent.com"}
                    />
                    </MDBCol>
                    <MDBCol>
                        <Reader/>
                            </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default ServicesGrid;
