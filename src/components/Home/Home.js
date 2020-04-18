import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import MovieGrid from'../MovieGrid/MovieGrid';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';


class Home extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_MOVIES' });
    }

    render() {

        return (
            <>

                <div className="App">
                    <h1>Welcome to Movie ChrOme</h1>
                    <h2>Movie Database</h2> 
                        <MovieGrid /> 
                </div>
            </>
        );
    }
}

const putPropsOnReduxStore = (reduxStore) => ({
    movies: reduxStore.moviesReducer,
});


export default withStyles()(connect(putPropsOnReduxStore)(Home));
