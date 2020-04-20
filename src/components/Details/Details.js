import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';


//This component manages the Details view
class Details extends Component{

    //redirects user back to homepage
    goBrowse = () => {
        this.props.history.push('/');
    }

    //advances user to the Edit view
    goEdit = () => {
        this.props.history.push('/edit');
    }

    render(){
        return(
            <>
            <h3>{this.props.details.title}</h3> 
            <img src={this.props.details.poster} />
            <p>{this.props.details.description}</p>
            <h4>Genre</h4>
            {/*The genre(s) arrives from index.js in the genresReducer as an array. So here I'm mapping through the array to capture all associated genres*/}
            {this.props.genres.map((genre) => {
                return(
                    <p>{genre.name}</p>
                );
            })}
            <Button variant="contained" color="secondary"  onClick={this.goBrowse}>Browse Movies</Button>
            <Button variant="contained" color="secondary" onClick={this.goEdit}>Edit Movie</Button>  
            </> 
        );
    }
} 

//making reducers available for use
const putPropsOnReduxStore = (reduxStore) => ({
    details: reduxStore.detailsReducer,
    genres: reduxStore.genresReducer,
});


export default withStyles()(connect(putPropsOnReduxStore)(Details));