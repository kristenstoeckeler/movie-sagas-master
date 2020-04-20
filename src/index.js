//necessary import
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeEvery, put } from 'redux-saga/effects';
import { Provider } from 'react-redux';
import axios from 'axios';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App/App';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMoviesSaga);
    yield takeEvery('DETAILS', getDetailSaga);
    yield takeEvery('GENRE', getGenreSaga);
    yield takeEvery('EDIT', editMovieSaga);
}

//this generator function manages requests to query to DB for all films to appear on the homepage
//it takes the query results and sends to the moviesReducer
function* getMoviesSaga(action) {
    console.log('in getMovies', action);
    try {
        const response = yield axios.get('/api/movies');
        console.log('Heres the GET response for /api/movies', response.data);
        yield put({ type: 'MOVIES', payload: response.data })
    }
    catch (error) {
        console.log('Error with Movies GET', error);
    }
}

//this generator function manages requests to query to DB for all the details of a specific film 
//it takes the query results and sends to the detailsReducer to appear in the Details view
//as well as to the rootSaga which triggers the genreSaga generator function.
//I used a axios.post because we need to pass the ID along to the router and my understanding
//is that a GET won't allow anything to be passed through.
function* getDetailSaga(action){
    console.log( 'in getDetail saga', action.payload);
    try{
        const response = yield axios.post(`/api/details/${action.payload}`, action.payload);
        console.log('Here is getDetails GET response', response.data)
        yield put ({ type: 'DETAIL_PAGE', payload: response.data});
        yield put ({ type: 'GENRE',payload: action.payload })
    }
    catch(error){
        console.log('Error with Details GET', error);   
    }
}

//this generator function manages requests to query to DB for all the genres associated with a specific film 
//it takes the query results and sends to the genresReducer to display on the DOM in the Details view
function* getGenreSaga(action){
    console.log( 'in getGenreSaga');
    const response = yield axios.post(`/api/genre/${action.payload}`, action.payload);
    yield put({ type: 'GENRE_RESPONSE', payload: response.data });
}

//this generator function manages requests to update information from the Edit view inputs to the DB for a film being edited 
//Currently it takes the query results and attempts to send them back to the rootSaga to trigger the detailsSaga 
//to re-render the updated film info to display on the DOM in the Details view. This second part is not working as of now.
function* editMovieSaga(action) {
    console.log('in editMovieSaga', action.payload);
    try {
        yield axios.put('/api/edit', action.payload);
        yield put({ type: 'DETAILS'})
    }
    catch (error) {
        console.log('Error on POST', error);
    }

}

// Used to store movies returned from the server
const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case 'MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store details of individual movies returned from the server
const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DETAIL_PAGE':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the genres associated with specific movies returned from the server
const genresReducer = (state = [], action) => {
    switch (action.type) {
        case 'GENRE_RESPONSE':
            return action.payload;
        default:
            return state;
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        moviesReducer,
        genresReducer,
        detailsReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
