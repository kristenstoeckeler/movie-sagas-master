import React, { Component } from 'react';
import MovieGrid from'../MovieGrid/MovieGrid';
import { connect } from 'react-redux';



//This component manages the Homepage view and dispatches the initial GET from the DB
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
                    {/**Importing MovieGrid component */}
                        <MovieGrid /> 
                </div>
            </>
        );
    }
}

export default connect()(Home);
