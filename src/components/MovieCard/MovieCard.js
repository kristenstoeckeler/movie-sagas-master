import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


//This is for Material UI
const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

//This Component establishes each individual card per movie
class MovieCard extends React.Component {
    //this is for Material UI
    state = { 
        expanded: false,
    };

    //this is for Material UI
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    //When the Details button is selected, this function captures the ID of the selection and dispatches it to the rootSaga
    //to trigger the DetailsReducer, and then advances the user to the Details view.
    handleSubmit = (movieId) => {
        console.log('in handleSubmit', movieId);
        this.props.dispatch({ type: 'DETAILS', payload: {movieId} });
        this.props.history.push(`/details`);
    }

    render() {
        const { classes } = this.props;
        let movie = this.props.movie;

        return (
            <>
            {/* {JSON.stringify(this.props.movies)} */}
                        <Card className={classes.card}>
                            <CardHeader 
                                avatar={
                                    <Avatar aria-label="Movie" className={classes.avatar}>
                                        M
                                    </Avatar>
                                        }
                                action={
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                            
                                title={movie.title}
                            />
                            <CardMedia
                                className={classes.media}
                                image={movie.poster}
                                title={movie.title}
                            />
                            <CardContent>
                        <Button type="submit" variant="contained" color="secondary" onClick={() => this.handleSubmit(movie.id)}>Details</Button>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton type="submit" aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>About:</Typography>
                                    <Typography paragraph>
                                        {movie.description}
                                    </Typography>
                                    
                                </CardContent>
                            </Collapse>
                        </Card>     
            </>
        );
    }
}

//this is for Material UI
MovieCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

//calling moviesReducer for use here
const putPropsOnReduxStore = (reduxStore) => ({
    movies: reduxStore.moviesReducer,
});

//I can't remember why I needed to do this here. 
MovieCard = withRouter(MovieCard);
export default withStyles(styles)(connect(putPropsOnReduxStore)(MovieCard));
