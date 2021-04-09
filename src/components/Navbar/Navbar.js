import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="container">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className="title">
                            {this.props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
export default NavBar;