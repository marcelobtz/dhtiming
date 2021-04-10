import React, { Component } from 'react';
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
import { DataGrid } from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
const URL_API = process.env.REACT_APP_URL_API;

class Event extends Component {

    stageTimeColumns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'POS', headerName: 'POS', width: 200 },
        { field: 'AUTO', headerName: 'AUTO', width: 200 },
        { field: 'TRIPULACION', headerName: 'TRIPULACION', width: 200 },
        { field: 'CLASE', headerName: 'CLASE', width: 200 },
        { field: 'TIEMPO', headerName: 'TIEMPO', width: 200 },
        { field: 'NETO', headerName: 'NETO', width: 200 },
        { field: 'DIFERENCIA', headerName: 'DIFERENCIA', width: 200 },
        { field: 'KMH', headerName: 'KMH', width: 200 },
    ]

    generalTimeColumns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'POS', headerName: 'POS', width: 200 },
        { field: 'AUTO', headerName: 'AUTO', width: 200 },
        { field: 'TRIPULACION', headerName: 'TRIPULACION', width: 200 },
        { field: 'CLASE', headerName: 'CLASE', width: 200 },
        { field: 'ACUMULADO', headerName: 'ACUMULADO', width: 200 },
        { field: 'NETO', headerName: 'NETO', width: 200 },
        { field: 'DIFERENCIA', headerName: 'DIFERENCIA', width: 200 },
    ]

    constructor(props) {
        super(props)
    
        this.state = {
          eventId: this.props.match.params.id ? this.props.match.params.id : null,
          groups: [],
          classes: [],
          stages: [],
          stagesTimes: [],
          generalTimes: [],
          group: "",
          class: "",
          stage: "",
          showLoader: true
        }
      }

    componentDidMount() {
        this.getGroups()
    }

    getGroups() {
        axios.post(`${URL_API}/group-list.php`, {eventId: this.state.eventId}).then(result => {
            this.setState({
                groups: result.data,
                group: result.data[0].NOMBRE
            })
            console.log(this.state.groups)

            this.getClasses(result.data[0].NOMBRE)
        })
    }

    getClasses(group) {
        axios.post(`${URL_API}/classes-list.php`, {
            eventId: this.state.eventId,
            groupName: group
        }).then(result => {
            this.setState({
                classes: result.data,
                class: result.data[0].NOMBRE
            })
            console.log("Classes", result.data)

            this.getStages(group)
        })
    }

    getStages(group) {
        axios.post(`${URL_API}/stage-list.php`, {
            eventId: this.state.eventId,
            groupName: group
        }).then(result => {
            this.setState({
                stages: result.data,
                stage: result.data[0].NOMBRE
            })
            console.log(this.state.stages)

            this.getTimes()
        })
    }

    // getStageTimes() {
    //     axios.post(`${URL_API}/stage-times-list.php`, {
    //         eventId: this.state.eventId,
    //         groupName: this.state.group,
    //         className: this.state.class,
    //         stageName: this.state.stage
    //     }).then(result => {
    //         this.setState({stagesTimes: result.data})
    //         console.log("Stage Times", this.state.stagesTimes)
    //     })
    // }

    // getGeneralTimes() {
    //     axios.post(`${URL_API}/general-times-list.php`, {
    //         eventId: this.state.eventId,
    //         groupName: this.state.group,
    //         className: this.state.class,
    //         stageName: this.state.stage
    //     }).then(result => {
    //         this.setState({generalTimes: result.data})
    //         console.log("General Times", this.state.generalTimes)
    //     })
    // }

    getTimes(select, value) {
        this.setState({ showLoader: true })

        let body = {}

        switch (select) {
            case "group":
                body = {
                    eventId: this.state.eventId,
                    groupName: value,
                    className: this.state.class,
                    stageName: this.state.stage
                }

                break;

            case "class":
                body = {
                    eventId: this.state.eventId,
                    groupName: this.state.group,
                    className: value,
                    stageName: this.state.stage
                }

                break;

            case "stage":
                body = {
                    eventId: this.state.eventId,
                    groupName: this.state.group,
                    className: this.state.class,
                    stageName: value
                }

                break;
            default:
                body = {
                    eventId: this.state.eventId,
                    groupName: this.state.group,
                    className: this.state.class,
                    stageName: this.state.stage
                }

                break;
        }

        axios.post(`${URL_API}/stage-times-list.php`, body).then(result => {
            // result.data.map((time) => {
            //     time.TRIPULACION = time.TRIPULACION.replace(" ", "</br>")
            // })

            this.setState({stagesTimes: result.data})
            console.log("Stage Times", this.state.stagesTimes)

            axios.post(`${URL_API}/general-times-list.php`, body).then(result => {
                this.setState({generalTimes: result.data})
                console.log("General Times", this.state.generalTimes)

                this.setState({ showLoader: false })
            }).catch((error) => {
                
            })
        })
    }

    handleSelectGroupChange = e => {
        this.setState({ group: e.target.value})
        this.getTimes("group", e.target.value)
    }
    
    handleSelectClassChange = e => {
        this.setState({ class: e.target.value })
        this.getTimes("class", e.target.value)
    }

    handleSelectStageChange = e => {
        this.setState({ stage: e.target.value })
        this.getTimes("stage", e.target.value)
    }
    
    render() {
        return (
        <div>
            <NavBar title="DH TIMING"/>
            <div>
                <Typography variant="h5" align="center" className="title">
                    TIEMPOS
                </Typography>
            </div>
            <div className="event-page-container">
                <div className="filters">
                    <div className="select">
                        <FormControl className="selectFormControl">
                            <InputLabel id="">Grupo</InputLabel>
                            <Select
                                labelId=""
                                id=""
                                value={this.state.group}
                                onChange={this.handleSelectGroupChange.bind(this)}
                            >
                            {this.state.groups.map(group =>
                                <MenuItem key={group.NOMBRE} value={group.NOMBRE}>{group.NOMBRE}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="select">
                        <FormControl className="selectFormControl">
                            <InputLabel id="">Clase</InputLabel>
                            <Select
                                labelId=""
                                id=""
                                value={this.state.class}
                                onChange={this.handleSelectClassChange.bind(this)}
                            >
                            {this.state.classes.map(className =>
                                <MenuItem key={className.NOMBRE} value={className.NOMBRE}>{className.NOMBRE}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="select">
                        <FormControl className="selectFormControl">
                            <InputLabel id="">Prueba</InputLabel>
                            <Select
                                labelId=""
                                id=""
                                value={this.state.stage}
                                onChange={this.handleSelectStageChange.bind(this)}
                            >
                            {this.state.stages.map(stage =>
                                <MenuItem key={stage.NOMBRE} value={stage.NOMBRE}>{stage.NOMBRE}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </div>
                    {this.state.showLoader &&
                        <div className="loader">
                            <LinearProgress />
                        </div>
                    }
                </div>
                <div className="result-tables">
                    <h3>TIEMPOS PRUEBA</h3>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={this.state.stagesTimes} columns={this.stageTimeColumns} autoPageSize={true} />
                    </div>
                    <h3>TIEMPOS GENERAL</h3>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={this.state.generalTimes} columns={this.generalTimeColumns} autoPageSize={true} />
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default Event;