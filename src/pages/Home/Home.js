import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import NavBar from "../../components/Navbar/Navbar";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Home.css';
import axios from "axios";
const URL_API = process.env.REACT_APP_URL_API;

class Home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          events: []
        }
      }

    componentDidMount() {
        axios.get(`${URL_API}/event-list.php`).then(result => {
            this.setState({events: result.data})
            console.log("", this.state.events)
        })
    }
    
    render() {
        return (
        <div>
            <NavBar title="DH TIMING"/>
            <div>
                <Typography variant="h6" align="center" className="title">
                    TIEMPOS ONLINE
                </Typography>
            </div>
            <div className="events-container">
            {this.state.events.map(event => 
                <Link to={`/event/${event.CODIGO}`}><Card className="item" key={event.CODIGO}>
                    <CardContent>
                        <Typography align="left" className="event-title">
                            {event.NOMBRE2}
                        </Typography>
                        <Typography align="left" className="event-title">
                            {event.NOMBRE}
                        </Typography>
                        <Typography align="left" className="event-title">
                            {event.NOMBRE3}
                        </Typography>
                        <Typography align="left" className="event-title">
                            {event.FECHA}
                        </Typography>
                    </CardContent>
                </Card></Link>
            )}
            </div>
        </div>
        );
    }
}
export default Home;