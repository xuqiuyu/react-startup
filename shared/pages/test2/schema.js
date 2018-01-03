import { SHOW_TYPE } from '../../common/constant';

export const querySchema = {
  fields: [{
    key: 'code',
    label: '航空联盟代号',
    placeholder: '请输入航空联盟代号',
    showType: 'normal'
  }, {
    key: 'unionName',
    label: '航空联盟名称',
    placeholder: '请输入航空联盟名称',
    showType: 'normal'
  }],
  buttons: [{
    text: '查询',
    type: 'primary',
    icon: 'search',
    click: 'handleSearch',
    width: '4'
  }, {
    text: '清除',
    icon: 'cross',
    isReset: true,
    width: '4'
  }]
};

export const tableSchema = {
  primaryKey: 'id',
  column: [
    {
      key: 'id',
      title: '航空联盟id'
    },
    {
      key: 'code',
      title: '航空联盟代号编码'
    },
    {
      key: 'unionName',
      title: '航空联盟名称'
    },
    {
      key: 'description',
      title: '描述'
    }
  ],
  toolbarButton: [{
    text: '新增',
    name: 'add',
    type: 'primary',
    icon: 'plus-circle-o',
    click: 'handleInsert'
  }],
  optionButton: [{
    text: '编辑',
    name: 'edit',
    click: 'handleUpdate'
  }, {
    text: '删除',
    name: 'delete',
    click: 'handleDelete'
  }]
};

export const editSchema = {
  primaryKey: 'id',
  fields: [{
    key: 'id',
    visible: false
  }, {
    key: 'code',
    label: '航空联盟代号',
    showType: SHOW_TYPE.INPUT
  }, {
    key: 'unionName',
    label: '航空联盟名称',
    showType: SHOW_TYPE.INPUT
  }, {
    key: 'description',
    label: '描述',
    showType: SHOW_TYPE.TEXTAREA
  }]
};
