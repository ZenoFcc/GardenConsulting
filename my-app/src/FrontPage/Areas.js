import React from 'react'
import {
    MDBListGroup
} from "mdbreact";
import axios from "axios"


export default class Area extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : props.location.Param.id,
            data : []
        }
    }
    async componentDidMount() {
        console.log("----" + this.state.id);
        const userId = {id : this.state.id};
        await axios.post("http://localhost:8080/users/showArea", userId)
            .then(res => {
                console.log(res);
                this.setState({ data: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return(
            <div style={{marginLeft : "20%"}}>
                <h1>Every Areas created</h1>
            <br/>
                    <ul>
                        { this.state.data.map( ( item, index ) => (
                            <div key={ index }>
                                <MDBListGroup style={{ width: "50rem" }}>
                                        <p> {item}</p>
                                </MDBListGroup>
                            </div>
                        )) }
                    </ul>
            </div>
        )
    }
}
