import {takeEvery, call, put} from 'redux-saga/effects';
import * as actionTypes from './actions';
import {fetchAllStatuses} from '../Shared/ApiGateway';
import ApiResult from '../Shared/ApiResult';


const fetchApi = async () : Promise<ApiResult> => {
    return await fetchAllStatuses();
}

function*  worker(){
    console.log('saga worker');
    yield put(actionTypes.FetchListRequestStarted()); 
    try {
        let apiResult:ApiResult = yield call(fetchApi);
        if (apiResult.isSucceed) {
            yield put(actionTypes.FetchListRequestSucceed(apiResult.object)); 
        } else{
            yield put(actionTypes.FetchListRequestFailed(apiResult.message || 'some error occured')); 
        }    
    } catch (error) {
        yield put(actionTypes.FetchListRequestFailed(error)); 
    } 
        
}

export function* statusSagaWatcher(){
    console.log('saga watcher');
    yield takeEvery(actionTypes.StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST, worker);
}