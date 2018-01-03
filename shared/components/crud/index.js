import React from 'react';
import { object, func, number, bool, string, arrayOf } from 'prop-types';

import EditForm from '../editForm';
import InnerTable from '../innerTable';
import InnerPagination from '../innerPagination';
import SearchForm from '../searchForm';

const CRUD = (props) => {
  const editForm = props.editable ? (
    <EditForm
      schema={props.editSchema}
      mode={props.editMode}
      data={props.editData}
      visible={props.editVisible}
      handleOk={props.editHandleOk}
      handleCancel={props.editHandleCancel}
      handleSelect={props.handleSelect}
    />) : '';
  return (
    <div>
      <SearchForm
        schema={props.querySchema}
        handleSearch={props.handleSearch}
        handleGenerateFile={props.handleGenerateFile}
        queryObj={props.queryObj}
      />
      <InnerTable
        data={props.tableData}
        schema={props.tableSchema}
        authInfo={props.authInfo}
        handleUpdate={props.handleUpdate}
        handleCopy={props.handleCopy}
        handleView={props.handleView}
        handleDown={props.handleDown}
        handleDelete={props.handleDelete}
        handleInsert={props.handleInsert}
        onTableChange={props.onTableChange}
        {...props.toolbarAndProps.toolbar}
        {...props.toolbarAndProps.optionBtn}
        pageProps={props.toolbarAndProps.props}
      />
      <InnerPagination
        currentPage={props.pageNum}
        total={props.totalCount}
        pageSize={props.pageSize}
        parentHandlePageChange={props.handlePageChange}
        pageSizechange={props.handlePageSizeChange}
      />
      {editForm}
    </div>
  );
};

CRUD.defaultProps = {
  // search
  querySchema: {},
  handleSearch: () => {},
  handleGenerateFile: () => {},
  queryObj: {},

  // table
  tableSchema: {},
  tableData: [],
  authInfo: {},
  handleUpdate: () => {},
  handleCopy: () => {},
  handleView: () => {},
  handleDown: () => {},
  handleDelete: () => {},
  handleInsert: () => {},
  onTableChange: () => {},

  // pagination
  pageNum: 0,
  totalCount: 0,
  pageSize: 0,
  handlePageChange: () => {},
  handlePageSizeChange: null,

  // edit
  editable: true,
  editSchema: {},
  editMode: 'add',
  editData: {},
  editVisible: false,
  editHandleOk: () => {},
  editHandleCancel: () => {},
  handleSelect: () => {}
};

CRUD.propTypes = {
  // search
  querySchema: object,
  handleSearch: func,
  handleGenerateFile: func,
  queryObj: object,

  // table
  tableSchema: object,
  tableData: arrayOf(object),
  authInfo: object,
  handleUpdate: func,
  handleCopy: func,
  handleView: func,
  handleDown: func,
  handleDelete: func,
  handleInsert: func,
  onTableChange: func,

  // pagination
  pageNum: number,
  totalCount: number,
  pageSize: number,
  handlePageChange: func,
  handlePageSizeChange: func,

  // edit
  editable: bool,
  editSchema: object,
  editMode: string,
  editData: object,
  editVisible: bool,
  editHandleOk: func,
  editHandleCancel: func,
  handleSelect: func
};

export default CRUD;
