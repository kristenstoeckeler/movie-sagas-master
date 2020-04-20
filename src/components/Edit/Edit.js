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
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];



class EditView extends Component {
    state = {
        id: this.props.details.id,
        genre: '',
        description: this.props.details.description,
        title: this.props.details.title,
    };

    handleChangeTitle = (event, propertyName) => {
        console.log('here is the title input', event.target.value);
        this.setState({
            [propertyName]: event.target.value
        });
    }


    handleChangeDesc = (event, propertyName) => {
        console.log( 'here is the description input', event.target.value );
        this.setState({ 
            [propertyName]: event.target.value 
        });
    }

    handleChangeGenre = genre => event => {
        console.log('here is the genre input', event.target.value);
        this.setState({
            genre: event.target.value
        });
    }

    cancelEdit = () => {
        this.props.history.push('/details');
    }

    handleSubmit = () => {
        console.log('in handleSubmit', this.state);
        this.props.dispatch({
            type: 'EDIT', 
            payload: this.state
        })
        this.props.history.push('/details');
    }

    render() {
        
        
        const { classes } = this.props;
        
        return (
            <>
            <form onSubmit={this.handleSubmit}>
                {/* {JSON.stringify(this.props.details)} */}            
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="outlined-multiline-static"
                    label="Edit"
                    multiline
                    rows="1"
                    defaultValue={this.state.title}
                    className="editInput"
                    margin="normal"
                    variant="outlined"
                    onChange={event => this.handleChangeTitle(event, 'title')}
                />
                <img src={this.props.details.poster} />    
                <TextField
                    id="outlined-multiline-static"
                    label="Edit"
                    multiline
                    rows="10"
                    defaultValue={this.state.description}
                    className="editInput"
                    margin="normal"
                    variant="outlined"
                    onChange={event => this.handleChangeDesc(event, 'description')}
                    />
                </form>
                <div className={classes.root}>
                <form className={classes.root} autoComplete="off">
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-native-simple">
                                Genre
                            </InputLabel>
                            <Select
                                native
                                value={this.state.genre}
                                onChange={this.handleChangeGenre('genre')}
                                input={
                                    <OutlinedInput
                                        name="age"
                                        labelWidth={this.state.labelWidth}
                                        id="outlined-age-native-simple"
                                    />
                                }
                            >
                                <option value="" />
                                <option value={'Adventure'}>Adventure</option>
                                <option value={'Animated'}>Animated</option>
                                <option value={'Biographical'}>Biographical</option>
                                <option value={'Comedy'}>Comedy</option>
                                <option value={'Disaster'}>Disaster</option>
                                <option value={'Drama'}>Drama</option>
                                <option value={'Epic'}>Epic</option>
                                <option value={'Fantasy'}>Fantasy</option>
                                <option value={'Musical'}>Musical</option>
                                <option value={'Romantic'}>Romantic</option>
                                <option value={'Science Fiction'}>Science Fiction</option>
                                <option value={'Space-Opera'}>Space Opera</option>
                                <option value={'Super Hero'}>Super Hero</option>
                            </Select>
                        </FormControl>
                </form>
                </div>
                <Button type="submit" variant="contained" color="secondary">Save Movie</Button>
            </form>
                <Button variant="contained" color="secondary" onClick={this.cancelEdit}>Cancel</Button>
            </>
        );
    }
}

// TextFields.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

EditView.propTypes = {
    classes: PropTypes.object.isRequired,
};


const putPropsOnReduxStore = (reduxStore) => ({
    details: reduxStore.detailsReducer,
});


export default withStyles(styles)(connect(putPropsOnReduxStore)(EditView));