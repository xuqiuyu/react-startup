import { combineReducers } from 'redux';
import { Map } from 'immutable';
import test from './pages/test/reducer';
import * as actions from './common/action';

// 公共数据
function common(state = { text: [] }, action) {
  switch (action.type) {
    case 'ACTION_SAGA1':
      return {
        // ...state,
        text: action.payload.text
      };
    default:
      return state;
  }
}

// 页面数据
function page(state = { mode: '', tableName: '', data: [] }, action) {
  switch (action.type) {
    case 'ACTION_SAGA1':
      return state;
    case actions.SHOW_ADD:
      return Map(state).set('mode', 'add').toJS();
    case actions.CLOSE_MODAL:
      return Map(state).set('mode', '').toJS();
    case actions.LOAD_ENTITY.SUCCESS:
      return Map(state).set('tableName', action.response.tableName).set('data', action.response.entity).toJS();
    default:
      return state;
  }
}

// const reducer = combineReducers({
//   test,
//   common,
//   page
// });

export default combineReducers({
  test,
  common,
  page
});
