import React from 'react';

import generator from '../../utils/generator';
import * as style from './style.scss';

/**
 * 内部表格组件
 */
class InnerTable extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  handleClick(e, f) {
    e.preventDefault();
    if (typeof f !== 'function') {
      console.log(`Error: ${f} is not a function`);
      return;
    }
    f(e, this.props.pageProps);
  }

  handleChange(pagination, filters, sorter) {
    const { onTableChange } = this.props;
    if (typeof onTableChange === 'function') { this.props.onTableChange(pagination, filters, sorter); }
  }


  handleOptionClick(e, record, f, primaryKey) {
    e.preventDefault();
    if (typeof f !== 'function') {
      // TODO error log print
      console.log('function not defined');
      return;
    }
    f(e, record, primaryKey, this.props.pageProps);
  }

  render() {
    const table = generator.generateTable(this);
    return (
      <div className={style.tableLayout}>
        {table}
      </div>
    );
  }
}


export default InnerTable;
