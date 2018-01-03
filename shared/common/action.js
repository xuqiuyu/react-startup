// constants generator
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
export const createRequestTypes = base => [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
  acc[type] = `${base}_${type}`;
  return acc;
}, {});

export const LOAD_ENTITY = createRequestTypes('LOAD_ENTITY');
export const loadEntity = () => ({ type: LOAD_ENTITY.REQUEST });
export const loadEntitySuccess = (entity, tableName) => ({
  type: LOAD_ENTITY.SUCCESS, response: { entity, tableName }
});
export const SHOW_ADD = 'SHOW_ADD';
export const showAdd = () => ({ type: SHOW_ADD });
export const SET_QUERYOBJECT = 'SET_QUERYOBJECT';
export const setQueryObject = queryObj => ({ type: SET_QUERYOBJECT, payload: { queryObj } });
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ({ type: CLOSE_MODAL });
