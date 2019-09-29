import {all} from 'redux-saga/effects';
import {statusSagaWatcher}  from '../cms/InquiryStatus';

export default function* rootSaga(){
    yield all([statusSagaWatcher()]);
}