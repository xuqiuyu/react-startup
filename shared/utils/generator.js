import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Tooltip,
  Transfer,
  Card,
  Radio,
  Switch,
  Checkbox
} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import { SHOW_TYPE } from '../common/constant';
// import { AutoComplete } from '../components';
// import AutoComplete from '../components/autoComplete';
import { checkAuthorization, keyWrapper, keyUnWrapper } from './index';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

moment.locale('zh-cn');

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 }
};

const searchFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const dateRangeFormItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 }
};

const _transformInput = (field, data) => (
  <Input placeholder={field.placeholder} disabled={field.disabled} />
);

const _transfeItemRender = item => (<Tooltip title={item.desc} >
  <span>{item.name}</span>
                                    </Tooltip>);

const _transformTransfer = (field, data) => {
  if (!field.options || field.options === 'dynamic') {
    throw (`EditForm: Option of ${field.key} has not been set`);
  }
  if (!Array.isArray(data[field.key])) {
    data[field.key] = [];
  }
  let newPrimaryKey = field.rowKey;
  if (!newPrimaryKey) {
    newPrimaryKey = 'id';
  }
  const transfeItemRender = !field.itemRender ? _transfeItemRender : field.itemRender;
  const showSearch = !field.showSearch ? false : field.showSearch;
  return (<Transfer
    dataSource={field.options}
    showSearch={showSearch}
    listStyle={field.listStyle}
    targetKeys={data[field.key]}
    render={transfeItemRender}
    rowKey={record => record[newPrimaryKey]}
    titles={['未添加', '已添加']}
    onChange={(e, a, b) => {
      data[field.key] = e;
    }}
  />);
};

const _transformSelect = (field, data, form) => {
  const options = [];
  options.push(<Option key='' value=''>{field.placeholder || '-请选择-'}</Option>);

  if (field.options && Array.isArray(field.options)) {
    field.options.forEach((option) => {
      options.push(<Option key={option.key} value={option.key} filterKey={option.value}>{option.value}</Option>);
    });
  }
  return (
    <Select
      mode={field.mode}
      optionFilterProp={field.filterProp}
      disabled={field.disabled}
      onChange={(value, label) => {
        if (field.onChange && typeof form.props[field.onChange] === 'function') {
          form.props[field.onChange](value, label, field.reduxKey);
        }
      }}
    >
      {options}
    </Select>
  );
};

const _transformMultipleSelect = (field, data, form) => {
  const options = [];
  options.push(<Option key='' value=''>{field.placeholder || '-请选择-'}</Option>);

  if (field.options && Array.isArray(field.options)) {
    field.options.forEach((option) => {
      options.push(<Option key={option.key} value={option.key}>{option.value}</Option>);
    });
  }

  return (
    <Select
      disabled={field.disabled}
      multiple={true}
      onChange={(value, label) => {
        if (field.onChange && typeof form.props[field.onChange] === 'function') {
          form.props[field.onChange](value, label);
        }
      }}
    >
      {options}
    </Select>
  );
};

const _transformTextarea = (field, data) => (<Input
  type='textarea'
  placeholder={field.placeholder}
  disabled={field.disabled}
  autosize={field.autosize}
/>);

const _transformSwitch = (field, data, form) => (
  <Switch />
);

const _transformCoupleSelect = (field, data, form) => _transformSelect(field, data, form);

const _transformRadio = (field, data, form) => {
  const options = [];

  if (field.options && Array.isArray(field.options)) {
    field.options.forEach((option) => {
      options.push(<RadioButton value={option.key}>{option.value}</RadioButton>);
    });
  }
  return (
    <RadioGroup
      disabled={field.disabled}
      onChange={(value, label) => {
        if (field.onChange && typeof form.props[field.onChange] === 'function') {
          form.props[field.onChange](value, label);
        }
      }}
    >
      {options}
    </RadioGroup>
  );
};

const _transformDatePicker = (field, data) => (
  <DatePicker style={{ width: '100%' }} placeholder={field.placeholder} format={field.format ? field.format : 'YYYY-MM-DD'} disabled={field.disabled} showTime={!!field.showTime} />
);

const _transformDateRange = (field, data, form) => (
  <RangePicker
    style={{ width: '100%' }}
    disabled={field.disabled}
    disabledDate={(current) => {
      if (field.disabledDate && typeof form.props[field.disabledDate] === 'function') {
        return form.props[field.disabledDate](current);
      }
    }}
    showTime={!!field.showTime}
    format={field.format ? field.format : 'YYYY-MM-DD'}
  />
);

// const _transformAutoComplete = (field, data) => {
//   const { options } = field;
//   field._autoOptions = field._autoOptions || [];
//   return (
//     <AutoComplete
//       placeholder={field.placeholder}
// disabled={field.disabled}
//       url={field.url}
//     />
//   );
// };

const _transformNumber = (field, data) => (
  <InputNumber
    min={field.min ? field.min : 0}
    max={field.max ? field.max : 10}
    step={field.step ? field.step : 1}
    disabled={field.disabled}
  />
);

const _transformSubController = (field, data, form) => {
  switch (field.showType) {
    case SHOW_TYPE.TRANSFER:
      return _transformTransfer(field, data);
    case SHOW_TYPE.SELECT:
      return _transformSelect(field, data, form);
    case SHOW_TYPE.MUTISELECT:
      return _transformMultipleSelect(field, data, form);
    case SHOW_TYPE.TEXTAREA:
      return _transformTextarea(field, data);
    case SHOW_TYPE.DATEPICKER:
      return _transformDatePicker(field, data);
    case SHOW_TYPE.DATERANGE:
      return _transformDateRange(field, data, form);
    // case SHOW_TYPE.AUTOCOMPLETE:
    //   return _transformAutoComplete(field, data);
    case SHOW_TYPE.NUMBER:
      return _transformNumber(field, data);
    case SHOW_TYPE.RADIO:
      return _transformRadio(field, data, form);
    case SHOW_TYPE.SWITCH:
      return _transformSwitch(field, data, form);
    case SHOW_TYPE.COUPLESELECT:
      return _transformCoupleSelect(field, data, form);
    case SHOW_TYPE.INPUT:
    default:
      return _transformInput(field, data);
  }
};

const _transformSearchForm = (searchForm, field, space) => {
  const { getFieldDecorator } = searchForm.props.form;
  let initialValue = '';
  let layout = searchFormItemLayout;
  if (field.showType === SHOW_TYPE.DATERANGE) {
    if (field.initialValue !== undefined && field.initialValue != null) {
      initialValue = [moment(field.initialValue[0]), moment(field.initialValue[1])];
    } else {
      initialValue = [moment((new Date()) - (3 * 86400000)), moment(new Date())];
    }
    layout = dateRangeFormItemLayout;
  } else if (field.showType === SHOW_TYPE.INPUT
    && field.initialValue !== undefined && field.initialValue != null) {
    initialValue = field.initialValue;
  }

  return (
    <Col key={field.key} span={space}>
      <FormItem
        key={field.key}
        {...layout}
        label={field.label}
      >
        { getFieldDecorator(field.key, {
          initialValue,
          rules: [{
            validator: (rule, value, callback) => {
              if (!field.validate || typeof field.validate !== 'function' || field.validate(value)) {
                callback();
              } else {
                callback(field.help);
              }
            }
          },, { required: !!field.required }]
        })(_transformSubController(field, {}, searchForm)) }
      </FormItem>
    </Col>
  );
};

const _transformItem = (form, field, mode, data) => {
  // 增加keyWrapper处理
  if (field.keyWrapper) {
    const key = field.key;
    if (field.key.indexOf('__ZA__') === -1) field.key = keyWrapper(key);
    if (data) data[field.key] = data[key] || data[keyUnWrapper(key)];
  }

  const { getFieldDecorator } = form.props.form;
  let initialValue = (data && data[field.key] !== undefined) ? data[field.key] : '';
  if (field.showType === SHOW_TYPE.DATEPICKER && initialValue) {
    initialValue = moment(initialValue);
  }
  if (field.showType === SHOW_TYPE.SELECT || field.showType === SHOW_TYPE.COUPLESELECT) {
    initialValue += '';
    // if initialValue is not in select options , set initialValue to an empty string
    if (field.options && Array.isArray(field.options) && !field.options.some(item => item.key === initialValue)) initialValue = '';
  }
  if (field.showType === SHOW_TYPE.MUTISELECT && initialValue === '') {
    initialValue = [];
  }

  let newformItemLayout = field.layout;
  if (!newformItemLayout) {
    newformItemLayout = formItemLayout;
  }

  return (

    <FormItem
      style={{ display: (field.visible !== undefined && !field.visible) ? 'none' : '' }}
      key={field.key}
      {...newformItemLayout}
      label={field.label}
      hasFeedback={true}
    >
      <div className={field.key} >
        <Tooltip placement='topLeft' title={field.tip || ''} >

          {getFieldDecorator(field.key, {
            initialValue,
            validateTrigger: 'onBlur',
            rules: [{
              validator: (rule, value, callback) => {
                if (!field.validate || typeof field.validate !== 'function' || field.validate(value)) {
                  callback();
                } else {
                  callback(field.help);
                }
              }
            }]
          })(
            _transformSubController(field, data, form)
          )}

        </Tooltip>
      </div>
    </FormItem>

  );
};

const _transformForm = (form, field, mode, data) => {
  if (field.showType === SHOW_TYPE.COUPLESELECT) {
    const result = [];
    result.push(_transformItem(form, field, mode, data));
    const coupleKey = field.coupleKey || (data && data[field.key]);
    const couples = field.couples;
    if (coupleKey && couples && couples[coupleKey]) {
      const coupleArr = couples[coupleKey].map(item => _transformForm(form, item, mode, data));
      result.push(...coupleArr);
    }
    return result;
  }
  return _transformItem(form, field, mode, data);
};

const _generateOperationBtn = (table) => {
  const { props } = table;
  const action = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: props.schema.opWidth || 100,
    render: (text, record) => {
      let showBtns;
      if (props.schema.buttonFilter) {
        showBtns = props[props.schema.buttonFilter](record);
      }

      const btns = [];
      props.schema.optionButton.forEach((item, i) => {
        if (Array.isArray(showBtns)) {
          if (showBtns.indexOf(i) >= 0) {
            if (!item.authKey || checkAuthorization(item.authKey, props.authInfo)) {
              btns.push(
                <span key={i}>
                  <Tooltip placement='topLeft' title={item.tip || ''}>
                    <a onClick={(e) => { table.handleOptionClick(e, record, props[item.click], props.schema.primaryKey); }} href='#'>
                      <Icon type={item.icon || ''} />{item.text}
                    </a>
                  </Tooltip>

                </span>
              );
              btns.push(<span key={`${i}s`} className='ant-divider' />);
            }
          }
        } else if (!item.authKey || checkAuthorization(item.authKey, props.authInfo)) {
          btns.push(
            <span key={i}>
              <Tooltip placement='topLeft' title={item.tip || ''}>
                <a onClick={(e) => { table.handleOptionClick(e, record, props[item.click], props.schema.primaryKey); }} href='#'>
                  <Icon type={item.icon || ''} />{item.text}
                </a>
              </Tooltip>
            </span>
          );
          btns.push(<span key={`${i}s`} className='ant-divider' />);
        }
      });
      btns.pop();
      return (
        <span>
          {btns}
        </span>
      );
    }
  };

  return action;
};

const generateForm = (searchForm) => {
  const rows = [],
    cols = [];
  const { props } = searchForm;
  const { schema } = props;
  let spaceLeft = 24,
    spaceNeed = 8;
  schema.fields.forEach((field, index) => {
    if (field.editable !== undefined && !field.editable) {
      field.disabled = true;
    }
    if (field.showType === SHOW_TYPE.DATERANGE) {
      spaceNeed = 16;
    } else {
      spaceNeed = 8;
    }

    // 增加强制换行通用配置参数 changeLine
    if (field.changeLine) spaceLeft = -1;

    spaceLeft -= spaceNeed;


    if (spaceLeft < 0) {
      const newCol = [...cols];
      rows.push(<Row key={rows.length} >{newCol}</Row>);
      cols.length = 0;
      spaceLeft = 24 - spaceNeed;
    }
    cols.push(_transformSearchForm(searchForm, field, spaceNeed));
  });

  if (cols.length > 0) {
    rows.push(<Row key='last' gutter={8}>{cols}</Row>);
  }

  const buttonRow = [];
  schema.buttons.forEach((item, index) => {
    buttonRow.push(<Col key={index} ><Button type={item.type} onClick={(e) => { searchForm.handleClick(e, props[item.click], item.isReset); }}><Icon type={item.icon} />{item.text}</Button></Col>);
  });
  rows.push(<Row type='flex' justify='center' key='btn' gutter={8}>{buttonRow}</Row>);


  return (
    <Form layout='horizontal'>
      {rows}
    </Form>
  );
};

const generateDataSyncTable = (dataSyncTable) => {
  const { props } = dataSyncTable;
  let showHeader = true;
  if (props.showHeader === false) {
    showHeader = props.showHeader;
  }
  const newCols = Object.assign([], props.checkColumn);
  props.schema.column.forEach((field) => {
    const col = {};
    col.key = field.key;
    col.dataIndex = field.key;
    col.title = field.title;
    if (field.width) col.width = field.width;
    if (field.render) {
      col.render = field.render;
    }
    if (field.sorter) {
      col.sorter = field.sorter;
    }
    if (field.sortOrder) {
      col.sortOrder = field.sortOrder;
    }
    newCols.push(col);
  });
  let newData = [];
  const checkRow = (index, id) => ({
    preProducte_Env: <Checkbox key={id} onChange={e => (props.handleChange(e, index, 'preProducte_Env'))} />,
    producte_Env: <Checkbox key={id} onChange={e => (props.handleChange(e, index, 'producte_Env'))} />
  });
  if (props.data && Array.isArray(props.data)) {
    newData = props.data.map((item, index) => {
      const newcheckRow = new checkRow(index, item.id);
      if (item.key) { return item; }
      if (props.schema.primaryKey) {
        item.key = item[props.schema.primaryKey];
      } else { item.key = index; }
      return Object.assign(item, newcheckRow);
    });
  }

  return (
    <Table
      rowKey='uid'
      showHeader={showHeader}
      scroll={{ x: true }}
      columns={newCols}
      dataSource={newData}
      pagination={false}
    />
  );
};

const generateTable = (innerTable) => {
  const { props } = innerTable;
  let showHeader = true;
  if (props.showHeader === false) {
    showHeader = props.showHeader;
  }

  // 解析schema
  const newCols = [];
  props.schema.column.forEach((field) => {
    const col = {};
    col.key = field.key;
    col.dataIndex = field.key;
    col.title = field.title;
    if (field.width) col.width = field.width;
    if (field.render) {
      col.render = field.render;
    }
    if (field.sorter) {
      col.sorter = field.sorter;
    }
    if (field.sortOrder) {
      col.sortOrder = field.sortOrder;
    }
    newCols.push(col);
  });


  if (props.schema.optionButton && Array.isArray(props.schema.optionButton)) {
    newCols.push(_generateOperationBtn(innerTable));
  }
  let newData = [];
  if (props.data && Array.isArray(props.data)) {
    newData = props.data.map((item, index) => {
      if (item.key) { return item; }

      if (props.schema.primaryKey) { item.key = item[props.schema.primaryKey]; } else { item.key = index; }
      return item;
    });
  }
  let buttonGroup = null;
  if (props.schema.toolbarButton) {
    const toolbarBtns = [];
    props.schema.toolbarButton.map((item) => {
      if (!item.authKey || checkAuthorization(item.authKey, props.authInfo)) {
        toolbarBtns.push((<span style={{ marginRight: '10px' }}><Button type={item.type} key={item.text} onClick={(e) => { innerTable.handleClick(e, props[item.click]); }}><Icon type={item.icon} />{item.text}</Button></span>));
      }
    });
    buttonGroup = (

      <div>
        {toolbarBtns}
      </div>
    );
  }

  return (
    <div>
      {buttonGroup}
      <Table showHeader={showHeader} scroll={{ x: 1300 }} columns={newCols} dataSource={newData} pagination={false} onChange={innerTable.handleChange} />
    </div>
  );
};

const generateMultiTable = (multiTable) => {
  const { props } = multiTable;
  const newCols = [];
  props.schema.column.forEach((field) => {
    const col = {};
    col.key = field.key;
    col.dataIndex = field.key;
    col.title = field.title;
    if (field.width) col.width = field.width;
    if (field.render) {
      col.render = field.render;
    }
    if (field.sorter) {
      col.sorter = field.sorter;
    }
    newCols.push(col);
  });

  if (props.schema.optionButton && Array.isArray(props.schema.optionButton)) {
    newCols.push(_generateOperationBtn(multiTable));
  }

  const rowSelection = {
    type: 'checkbox',
    onChange: multiTable.handleSelectChange,
    selectedRowKeys: props.selectedKeys
  };

  let newData = [];
  if (props.data && Array.isArray(props.data)) {
    newData = props.data.map((item, index) => {
      if (item.key) { return item; }
      if (props.schema.primaryKey) { item.key = item[props.schema.primaryKey]; } else { item.key = index; }
      return item;
    });
  }

  let buttonGroup = null;
  if (props.schema.toolbarButton) {
    const toolbarBtns = [];
    props.schema.toolbarButton.map((item) => {
      if (!item.authKey || checkAuthorization(item.authKey, props.authInfo)) {
        toolbarBtns.push((<Button type={item.type} key={item.text} onClick={(e) => { multiTable.handleClick(e, props[item.click]); }}><Icon type={item.icon} />{item.text}</Button>));
      }
    });
    buttonGroup = (
      <div className='db-table-button'>
        <ButtonGroup>
          {toolbarBtns}
        </ButtonGroup>
      </div>
    );
  }

  return (
    <div>
      {buttonGroup}
      <Table showHeader={true} scroll={{ x: true }} rowSelection={rowSelection} columns={newCols} dataSource={newData} pagination={false} onChange={multiTable.handleChange} />
    </div>
  );
};

const generateEditForm = (form, schema, mode, data) => {
  const formItem = [];
  const { fields } = schema;

  fields.map((field) => {
    if (mode && mode !== 'add' && mode !== 'edit' && mode !== 'copy') {
      mode = 'edit';
    }
    if (mode === 'add' && field.editableInAdd !== undefined && !field.editableInAdd) {
      field.disabled = true;
    } else if (mode === 'edit' && field.editableInEdit !== undefined && !field.editableInEdit) {
      field.disabled = true;
    } else if (mode === 'copy') {
      // 如果没有设置 editableInCopy 属性, 就使用 editableInEdit 属性
      if (field.editableInCopy !== undefined && !field.editableInCopy) {
        field.disabled = true;
      } else if (field.editableInCopy === undefined && field.editableInEdit !== undefined && !field.editableInEdit) {
        field.disabled = true;
      } else {
        field.disabled = false;
      }
    } else {
      field.disabled = false;
    }
    const transItem = _transformForm(form, field, mode, data);
    if (Array.isArray(transItem)) {
      formItem.push(...transItem);
    } else {
      formItem.push(transItem);
    }
  });
  return (
    <Form layout='horizontal'>
      {formItem}
    </Form>
  );
};

const generateCustomBtn = (form, schema) => {
  if (!schema.buttons || !Array.isArray(schema.buttons)) {
    return;
  }
  const btns = [];
  schema.buttons.forEach((btn) => {
    const disabled = btn.disabled === true;
    btns.push(<Button key={btn.text} disabled={disabled} style={btn.style} onClick={(e) => { form.handleClick(e, form.props[btn.click]); }} type={btn.type || 'primary'} >{btn.text}</Button>);
  });
  return btns;
};

const generateStatisticSummary = (statisticSummary) => {
  const { props } = statisticSummary;
  const rows = [];
  let cols = [];
  let spaceLeft = 24;
  const data = props.data;
  if (data) {
    data.forEach((item) => {
      const spaceNeed = 4;
      if (spaceLeft < spaceNeed) {
        rows.push(<Row key={rows.length} gutter={16} style={{ marginBottom: '20px' }}>{cols}</Row>);
        cols = [];
        spaceLeft = 24;
      }
      spaceLeft -= spaceNeed;
      cols.push(
        <Col key={cols.length} span='4'>
          <Card title={item.name} bordered={false}>{item.amt}</Card>
        </Col>
      );
    });
  }
  if (cols.length > 0) {
    rows.push(<Row key={rows.length} gutter={16}>{cols}</Row>);
  }
  return (
    <div style={{ background: '#F8F8F8', padding: '30px', marginBottom: '20px' }}>
      {rows}
    </div>
  );
};

export default {
  generateForm,
  generateTable,
  generateDataSyncTable,
  generateMultiTable,
  generateEditForm,
  generateCustomBtn,
  generateStatisticSummary
};
