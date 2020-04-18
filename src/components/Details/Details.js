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


class Details extends Component{
    
    render(){
        return(
            <>
            </>
        );
    }
}


const putPropsOnReduxStore = (reduxStore) => ({
    movies: reduxStore.moviesReducer,
});


export default withStyles()(connect(putPropsOnReduxStore)(Details));