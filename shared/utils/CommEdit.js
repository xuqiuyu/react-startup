import React, { Component as C } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditPage from '../components/editPage';
import * as commonAction from '../common/actions';
import { setCoupleKey, formValuesFilter } from '../shared';
/** **********************************************
option
====================================================
name                  type        M/O    desc
schema                object       M     contains querySchema / tableSchema / editSchema
schemaHandle          function     O     the func will be exectue at the beginning of render
    (schema, props)                      used to deal with the schema. ex: add dynamic select value
initConstruct         function     O     the func will be exectue at the after initQueryObject
    (props)                              is done to perform any initialization
dataHandle            function     O     the func will be exectue at the render
saveDataHandle        function     O     the func will be exectue at the saveEntity
====================================================
********************************************** * */
const CommEdit = option => () => {
  class CommEditComponent extends C {
    constructor(props) {
      super();
      const { initConstruct } = option;
      if (typeof initConstruct === 'function') {
        initConstruct(props);
      }

      this.editHandleOk = this.editHandleOk.bind(this);
      this.editHandleCancel = this.editHandleCancel.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
      // 清理store中的coupleKey
      this.props.clearCoupleKey();
    }

    editHandleOk(values) {
      formValuesFilter(values);
      const { mode } = this.props.routeParams;
      const { saveEntity } = this.props;
      const { saveDataHandle } = option;
      if (typeof saveDataHandle === 'function') {
        saveDataHandle(values, this.props, mode);
      }
      saveEntity(values, mode, true);
    }

    editHandleCancel() {
      const { lastQueryObj, navBack, setQueryObject } = this.props;

      navBack();
      setQueryObject(lastQueryObj);
    }

    handleSelect(value, label, reduxKey) {
      const { handleSelectAction = commonAction.SET_COUPLESELECT } = option;
      let data = value;
      if (reduxKey && reduxKey !== '') {
        const obj = {};
        obj[reduxKey] = value;
        data = obj;
      }
      const payload = {};
      payload[reduxKey] = value;
      if (handleSelectAction && handleSelectAction !== '') {
        this.props.dispatch({
          type: handleSelectAction,
          payload: data
        });
      }
    }

    render() {
      const { schemaHandle, schema, dataHandle } = option;
      if (typeof schemaHandle === 'function') {
        schemaHandle(schema, this.props);
      }

      const { mode, id } = this.props.routeParams;

      const { tableSchema } = schema;
      const { tableData } = this.props;
      const data = {};

      if (mode === 'edit' || mode === 'copy' || mode === 'view') {
        for (const item of tableData) {
          if (id === `${item[tableSchema.primaryKey]}`) {
            // data = item;
            for (const key in item) data[key] = item[key];
            break;
          }
        }
        if (typeof dataHandle === 'function') {
          dataHandle(data, this.props);
        }
      }
      if (mode === 'copy') {
        data[tableSchema.primaryKey] = null;
      }

      // 增加一段通用处理coupleSelect类型字段的逻辑
      const { editSchema } = schema;
      const { coupleKey } = this.props;
      if (coupleKey && schema.editSchema.fields) {
        setCoupleKey(editSchema.fields, coupleKey, mode !== 'add');
      }

      return (
        <EditPage
          mode={mode} schema={editSchema} data={data}
          handleCancel={this.editHandleCancel}
          handleOk={this.editHandleOk}
          handleSelect={this.handleSelect}
        />
      );
    }
  }

  return connect(
    (state) => {
      const { tableName } = state;
      const tableData = Array.isArray(state.entities[tableName]) ? state.entities[tableName] : [];

      return {
        dropdown: state.dropdown,
        tableData,
        lastQueryObj: state.lastQueryObj,
        coupleKey: state.coupleKey
      };
    },
    dispatch => ({
      dispatch,
      saveEntity: bindActionCreators(commonAction.saveEntity, dispatch),
      navBack: bindActionCreators(commonAction.navBack, dispatch),
      navTo: bindActionCreators(commonAction.navTo, dispatch),
      setQueryObject: bindActionCreators(commonAction.setQueryObject, dispatch),
      clearCoupleKey: bindActionCreators(commonAction.clearCoupleKey, dispatch)
    }))(CommEditComponent);
};

export default CommEdit;
