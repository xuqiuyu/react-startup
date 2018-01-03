import React, { Component as C } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';

import * as commonAction from '../common/action';
// import { initQueryObject, getSort, setCoupleKey, formValuesFilter } from '../shared';
/** **********************************************
option
====================================================
name                  type        M/O    desc
schema                object       M     contains querySchema / tableSchema / editSchema
initAction            action       O     this will be excute at the beginning of componentWillMount
schemaHandle          function     O     the func will be exectue at the beginning of render
    (schema, props)                      used to deal with the schema. ex: add dynamic select value
editable              bool         O     default: true, which means wheather add/edit is necessary
initConstruct         function     O     the func will be exectue at the after initQueryObject
    (props)                              is done to perform any initialization
queryObjHandle        function     O     change queryObj before load entity
showAdd               function     O     custom to handle add
showEdit              function     O     custom to handle edit
showCopy              function     O     custom to handle copy
showView              function     O     custom to handle view
====================================================
********************************************** * */
const Magic = option => (WrapComp) => {
  class MagicComponent extends C {
    constructor(props) {
      super();
      const {
        setTableName, setQueryObject, route, queryObj
      } = props;
      const { initConstruct } = option;
      if (route.tableName) {
        setTableName(route.tableName);
      }
      // initQueryObject(queryObj);
      if (typeof initConstruct === 'function') {
        initConstruct(props);
      }
      // setQueryObject(queryObj);

      this.handleSearch = this.handleSearch.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleCopy = this.handleCopy.bind(this);
      this.handleDown = this.handleDown.bind(this);
      this.handleView = this.handleView.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleInsert = this.handleInsert.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
      this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
      this.handleTableChange = this.handleTableChange.bind(this);
      this.editHandleOk = this.editHandleOk.bind(this);
      this.editHandleCancel = this.editHandleCancel.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
      this.handleGenerateFile = this.handleGenerateFile.bind(this);
    }

    componentWillMount() {
      const { initAction } = option;
      const _action = typeof initAction === 'function' ? initAction() : undefined;
      if (typeof _action === 'object' && _action.type !== '') {
        this.props.dispatch(_action);
      } else {
        this.props.loadEntities();
      }
    }

    componentWillUnmount() {
      const { queryObj, setQueryObject } = this.props;
      // debugger;
      // setLastQueryObject(queryObj);
      // initQueryObject(queryObj);
      setQueryObject(queryObj);
    }

    handleSearch(e, data) {
      const { queryObj, loadEntities, setQueryObject } = this.props;
      const { queryObjHandle } = option;
      queryObj.pageNum = 1;
      if (typeof queryObjHandle === 'function') {
        queryObjHandle(queryObj, data);
      } else {
        queryObj.param = data;
      }
      setQueryObject(queryObj);
      loadEntities();
    }

    // 生成文件
    handleGenerateFile(e, data) {
      const { handleGenerateFileAction } = option;
      if (handleGenerateFileAction && typeof handleGenerateFileAction === 'function') {
        const { queryObj, setQueryObject } = this.props;
        queryObj.param = data;
        setQueryObject(queryObj);
        this.props.dispatch(handleGenerateFileAction(data));
        // this.handleSearch(e, data);
      }
    }

    handleUpdate(e, record, primaryKey) {
      const { showEdit } = option;
      if (typeof showEdit === 'function') {
        showEdit(this.props, record, primaryKey);
      } else {
        this.props.showEdit(record);
      }
    }

    handleCopy(e, record, primaryKey) {
      const { showCopy } = option;
      if (typeof showCopy === 'function') {
        showCopy(this.props, record, primaryKey);
      } else {
        this.props.showCopy(record);
      }
    }

    handleDown(e, record, primaryKey) {
      const { downLoad } = option;
      if (typeof downLoad === 'function') {
        downLoad(this.props, record, primaryKey);
      } else {
        this.props.downLoad(record, primaryKey);
      }
    }

    handleView(e, record, primaryKey) {
      const { showView } = option;
      if (typeof showView === 'function') {
        showView(this.props, record, primaryKey);
      } else {
        this.props.showView(record);
      }
    }

    handleDelete(e, record, primaryKey) {
      const { showDelete } = option;
      if (typeof showDelete === 'function') {
        showDelete(this.props, record, primaryKey);
      } else {
        Modal.confirm({
          title: '确认删除',
          content: `当前被选中的行: ${record[primaryKey]}`,
          onOk: () => {
            this.props.deleteEntity(record, primaryKey);
          }
        });
      }
    }

    handleInsert() {
      const { showAdd } = option;
      if (typeof showAdd === 'function') {
        showAdd(this.props);
      } else {
        this.props.showAdd();
      }
    }

    handlePageChange(pageNum) {
      const { queryObj, loadEntities, setQueryObject } = this.props;
      queryObj.pageNum = pageNum;
      setQueryObject(queryObj);
      loadEntities();
    }

    handlePageSizeChange(current, size) {
      const { queryObj, loadEntities, setQueryObject } = this.props;
      queryObj.pageNum = 1;
      queryObj.pageSize = size;
      setQueryObject(queryObj);
      loadEntities();
    }


    handleTableChange(p, f, s) {
      let { queryObj } = this.props;
      const { setQueryObject, loadEntities } = this.props;

      queryObj = Object.assign(queryObj, getSort(s.field, s.order));
      setQueryObject(queryObj);
      loadEntities();
    }

    editHandleOk(values) {
      const { saveEntity, mode } = this.props;
      formValuesFilter(values);
      if (mode === 'view') {
        this.props.closeModal();
      } else {
        saveEntity(values, mode);
      }
    }

    editHandleCancel() {
      this.props.closeModal();
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
      const {
        schemaHandle, schema, editable, toolbar, optionBtn
      } = option;
      if (typeof schemaHandle === 'function') {
        schemaHandle(schema, this.props);
      }
      // 增加一段通用处理coupleSelect类型字段的逻辑
      const { editSchema } = schema;
      // const { coupleKey, mode } = this.props;
      // if (coupleKey && editSchema && editSchema.fields) setCoupleKey(editSchema.fields, coupleKey, mode !== 'add');

      const { querySchema, tableSchema } = schema;
      const {
        pageNum, pageSize, totalCount, visible, tableData, editData,
        authInfo, queryObj, mode
      } = this.props;

      const toolbarAndProps = {
        props: this.props,
        toolbar,
        optionBtn
      };

      const props = {
        querySchema,
        handleSearch: this.handleSearch,
        queryObj,
        handleGenerateFile: this.handleGenerateFile,

        // table
        tableSchema,
        tableData,
        authInfo,
        handleUpdate: this.handleUpdate,
        handleCopy: this.handleCopy,
        handleDown: this.handleDown,
        handleView: this.handleView,
        handleDelete: this.handleDelete,
        handleInsert: this.handleInsert,
        onTableChange: this.handleTableChange,
        toolbarAndProps,

        // pagination
        pageNum,
        totalCount,
        pageSize,
        handlePageChange: this.handlePageChange,
        handlePageSizeChange: this.handlePageSizeChange,

        // edit
        editable,
        editSchema,
        editMode: mode,
        editData,
        editVisible: visible,
        editHandleOk: this.editHandleOk,
        editHandleCancel: this.editHandleCancel,
        handleSelect: this.handleSelect
      };

      return (
        <WrapComp {...props} />
      );
    }
  }

  return connect(
    (state) => {
      // const { tableName } = state;
      // const tableData = Array.isArray(state.entities[tableName]) ? state.entities[tableName] : [];
      const tableData = state.reducer.page.data;
      return {
        visible: !!state.reducer.page.mode,
        // pageNum: state.pagination.pageNum,
        // pageSize: state.pagination.pageSize,
        // totalCount: state.pagination.totalCount,
        // mode,
        // queryObj: state.queryObj,
        // dropdown: state.dropdown,
        // coupleKey: state.coupleKey,
        // authInfo: state.auth.authInfo,
        tableData
        // editData: state.operation.data
      };
    },
    dispatch => ({
      dispatch,
      loadEntities: bindActionCreators(commonAction.loadEntity, dispatch),
      showAdd: bindActionCreators(commonAction.showAdd, dispatch),
      // showEdit: bindActionCreators(commonAction.showEdit, dispatch),
      // downLoad: bindActionCreators(commonAction.downLoad, dispatch),
      // showView: bindActionCreators(commonAction.showView, dispatch),
      // showCopy: bindActionCreators(commonAction.showCopy, dispatch),
      closeModal: bindActionCreators(commonAction.closeModal, dispatch),
      // saveEntity: bindActionCreators(commonAction.saveEntity, dispatch),
      // setTableName: bindActionCreators(commonAction.setTableName, dispatch),
      setQueryObject: bindActionCreators(commonAction.setQueryObject, dispatch)
      // setLastQueryObject: bindActionCreators(commonAction.setLastQueryObject, dispatch),
      // deleteEntity: bindActionCreators(commonAction.deleteEntity, dispatch),
      // setSelectedKey: bindActionCreators(commonAction.setSelectedKey, dispatch),
      // clearSelectedKey: bindActionCreators(commonAction.clearSelectedKey, dispatch),
      // navTo: bindActionCreators(commonAction.navTo, dispatch)
    }))(MagicComponent);
};

export default Magic;
