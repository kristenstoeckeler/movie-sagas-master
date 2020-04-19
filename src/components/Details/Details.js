import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';


class Details extends Component{

    // componentDidMount(){
    //     this.props.dispatch({type:'DETAILS'});
    // }

    goBrowse = () => {
        this.props.history.push('/');
    }

    goEdit = () => {
        this.props.history.push('/edit');
    }

    render(){
        return(
            <>
            {JSON.stringify(this.props.details)}
            <h3>{this.props.details.title}</h3> 
            <img src={this.props.details.poster} />
            <p>{this.props.details.description}</p>
            <h4>Genre</h4>
            <h5>{this.props.details.name}</h5>
            <Button variant="contained" color="secondary"  onClick={this.goBrowse}>Browse Movies</Button>
            <Button variant="contained" color="secondary" onClick={this.goEdit}>Edit Movie</Button> 
            </> 
        );
    }
} 


const putPropsOnReduxStore = (reduxStore) => ({
    details: reduxStore.detailsReducer,
});


export default withStyles()(connect(putPropsOnReduxStore)(Details));