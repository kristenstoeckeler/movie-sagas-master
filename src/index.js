import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeEvery, put } from 'redux-saga/effects';
import { Provider } from 'react-redux';
import axios from 'axios';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { HashRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


import App from './components/App/App';
// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMoviesSaga);
    yield takeEvery('DETAILS', getDetailSaga);
    yield takeEvery('EDIT', editMovieSaga);
}

function* editMovieSaga(action){
    console.log('in editMovieSaga', action.payload);
    try{
        yield axios.put('/api/edit', action.payload);
        yield put({ type: 'DETAILS'}) 
    }
    catch (error) {
        console.log('Error on POST', error);
    }
    
}

function* getDetailSaga(action){
    console.log( 'in getDetail saga', action.payload);
    try{
        const response = yield axios.post(`/api/details/${action.payload}`, action.payload);
        yield put ({ type: 'DETAIL_PAGE', payload: response.data})
    }
    catch(error){
        console.log('Error with Details GET', error);   
    }
}

const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DETAIL_PAGE':
            return action.payload;
        default:
            return state;
    }
}

function* getMoviesSaga(action){
    console.log( 'in getMovies', action);
    try{
        const response = yield axios.get('/api/movies');
        console.log( 'Heres the GET response for /api/movies');
        yield put ({ type: 'MOVIES', payload: response.data})
    }
    catch(error){
        console.log('Error with Movies GET', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case 'MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        moviesReducer,
        genres,
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
