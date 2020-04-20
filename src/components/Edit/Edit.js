import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//This is imported from Material-UI
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


//This component manages Edit view
class EditView extends Component {

    //establishing local state
    state = {
        id: this.props.details.id,
        genre: '',
        description: this.props.details.description,
        title: this.props.details.title,
    };

    //updates state with new data from Edit view inputs for title
    handleChangeTitle = (event, propertyName) => {
        console.log('here is the title input', event.target.value);
        this.setState({
            [propertyName]: event.target.value
        });
    }

    //updates state with new data from Edit view inputs for description  
    handleChangeDesc = (event, propertyName) => {
        console.log( 'here is the description input', event.target.value );
        this.setState({ 
            [propertyName]: event.target.value 
        });
    }

    //updates state with new data from Edit view inputs for genre
    handleChangeGenre = genre => event => {
        console.log('here is the genre input', event.target.value);
        this.setState({
            genre: event.target.value
        });
    }

    //redirects user back to Details view if they opt to cancel the edit
    cancelEdit = () => {
        this.props.history.push('/details');
    }

    //dispatching local props to root saga, to trigger EditSaga; then redirects user to Details view again.
    //This functionality is currently *NOT* displaying the Details view with updated information from the edit.
    handleSubmit = () => {
        console.log('in handleSubmit', this.state);
        this.props.dispatch({
            type: 'EDIT', 
            payload: this.state
        })
        this.props.history.push('/details');
    }

    render() {
        {/*This (and below) is a Material UI import */}
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

//This is for Material-UI
EditView.propTypes = {
    classes: PropTypes.object.isRequired,
};

//Making detailsReducer available for use
const putPropsOnReduxStore = (reduxStore) => ({
    details: reduxStore.detailsReducer,
});


export default withStyles(styles)(connect(putPropsOnReduxStore)(EditView));