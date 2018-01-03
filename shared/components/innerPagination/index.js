import React from 'react';
import { number, func } from 'prop-types';
import { Pagination, Select, Row } from 'antd';

import * as style from './style.scss';

/**
 * 内部分页器组件
 */

const InnerPagination = (props) => {
  const {
    total, pageSize, currentPage, parentHandlePageChange, pageSizechange
  } = props;
  let showSizeChanger = false;
  if (typeof pageSizechange === 'function') {
    showSizeChanger = true;
  }

  return (

    <div className={style.paginationLayout}>
      <Row type='flex' justify='center' align='middle'>
        <Pagination
          showQuickJumper={true}
          selectComponentClass={Select}
          total={total}
          showTotal={total => `每页${pageSize > total ? total : pageSize}条, 共 ${total} 条`}
          pageSize={pageSize}
          defaultCurrent={1}
          current={currentPage}
          onChange={parentHandlePageChange}
          showSizeChanger={showSizeChanger}
          onShowSizeChange={pageSizechange}
        />
      </Row>
    </div>
  );
};

InnerPagination.defaultProps = {
  total: 0,
  pageSize: 10,
  currentPage: 1,
  parentHandlePageChange: () => {},
  pageSizechange: () => {}
};

InnerPagination.propTypes = {
  total: number,
  pageSize: number,
  currentPage: number,
  parentHandlePageChange: func,
  pageSizechange: func
};

export default InnerPagination;
