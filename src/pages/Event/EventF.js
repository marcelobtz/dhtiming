import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import NavBar from "../../components/Navbar/Navbar";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Event.css';
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

function EventF(props) {
    const [group, setGroup] = useState("CLASIFICACION1")

    const handleSelect = (e) => {
        //console.log(e.target.value)
        setGroup(e.target.value)

        //console.log(group)
        test()
    }

    const test = () => {
        console.log("group", group)
    }

    return (
        <div className="select">
            <FormControl className="selectFormControl">
                <InputLabel id="">Grupo</InputLabel>
                <Select
                    value={group}
                    onChange={handleSelect}
                >
                    <MenuItem key="CLASIFICACION1" value="CLASIFICACION1">CLASIFICACION1</MenuItem>
                    <MenuItem key="CLASIFICACION2" value="CLASIFICACION2">CLASIFICACION2</MenuItem>
                    <MenuItem key="CLASIFICACION3" value="CLASIFICACION3">CLASIFICACION3</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default EventF;