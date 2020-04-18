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
import Details from '../Details/Details';



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

class MovieCard extends React.Component {
    state = { 
        expanded: false,
        description: '',
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleSubmit = (movieDesc) => {
        console.log('in handClick', movieDesc);
        this.props.dispatch({ type: 'DETAILS', payload: movieDesc});
        this.props.history.push('/details');
    }


    //HandleChange and HandleSubmit Not WORKING TOGETHER AT THE MOMENT
    handleChange = (movieDesc) => {
        console.log('in handChange', movieDesc);
        this.setState({
            expanded: false,
            description: movieDesc,
        })
        return(
            <>
            <Details description={this.state.description} />
            </>
        )
    }

    render() {
        const { classes } = this.props;
        let movie = this.props.movie;

        return (
            <>
            <form onSubmit={this.handleSubmit}>
            {/* {JSON.stringify(this.props.movies)}
            {this.props.movies.map((movie) => {
                return ( */}
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
                                onClick={()=>this.handleChange(movie.description)}
                            />
                            <CardContent>
                                <Typography component="p">
                                    {movie.description}
                            </Typography>
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
                </form>           
            </>
        );
    }
}

MovieCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const putPropsOnReduxStore = (reduxStore) => ({
    movies: reduxStore.moviesReducer,
});

MovieCard = withRouter(MovieCard);
export default withStyles(styles)(connect(putPropsOnReduxStore)(MovieCard));
