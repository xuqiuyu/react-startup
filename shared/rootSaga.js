import { takeLatest, put, call } from 'redux-saga/effects';
import 'isomorphic-fetch';

import { sagaAction } from './pages/test/action';
import * as actions from './common/action';

function* test() {
  const data = yield call(() => fetch('//offline-news-api.herokuapp.com/stories'));
  // debugger
  // yield put(actions.loadEntitySuccsss({
  //   tableName: 'test2',
  //   payload: [
  //     123123
  //   ]
  // }));
}

function* loadEntity() {
  yield put(actions.loadEntitySuccess([{
    id: '1',
    code: 'test',
    unionName: '测试联盟...',
    description: '测试描述...'
  }], 'test'));
}

export default function* () {
  yield [
    takeLatest('ACTION_TEST', test),
    takeLatest(actions.LOAD_ENTITY.REQUEST, loadEntity)
  ];
}
