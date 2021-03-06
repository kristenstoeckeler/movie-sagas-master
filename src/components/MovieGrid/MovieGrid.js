import React from 'react';
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

//this is for Material UI
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

//This component is importing each Card into a Grid display
//Though very imperfectly at the moment
class GuttersGrid extends React.Component {
    state = {
        spacing: '16',
    };

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <Grid container className={classes.root} spacing={16}>
                
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                        {this.props.movies.map(movie => (
                            <MovieCard movie={movie} />
                        ))}
                        
                        {/* {[0, 1, 2].map(value => (
                            <>
                            <Grid key={value} item>
                            </Grid>
                            </>
                        ))} */}
                        
                    </Grid>
                    
                </Grid>
                
            </Grid>
        );
    }
}

GuttersGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

const putPropsOnReduxStore = (reduxStore) => ({
    movies: reduxStore.moviesReducer,
});


export default withStyles(styles, GuttersGrid)(connect(putPropsOnReduxStore)(GuttersGrid));