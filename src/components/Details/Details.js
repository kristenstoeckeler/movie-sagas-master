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

    handleClick = () => {
        this.props.history.push('/');
    }

    render(){
        return(
            <>
            <h3>{this.props.details.title}</h3>
            <p>{this.props.details.description}</p>
            <Button type="submit" variant="contained" color="secondary"  onClick={this.handleClick}>Browse Movies</Button>
            </>
        );
    }
} 


const putPropsOnReduxStore = (reduxStore) => ({
    details: reduxStore.detailsReducer,
});


export default withStyles()(connect(putPropsOnReduxStore)(Details));