import React, { Component, PropTypes } from 'react';
import { object, string, bool, func } from 'prop-types';
import { Form, Modal } from 'antd';

import generator from '../../utils/generator';

class EditForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { mode, form, handleOk } = this.props;
    if (mode === 'view') {
      handleOk();
      return;
    }

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleOk(values);
      }
    });
  }

  render() {
    const {
      visible, mode, handleCancel, data, handleOk, schema, form
    } = this.props;
    let content,
      title;
    if (mode === 'add') {
      title = '新增';
      for (const field in schema.fields) {
        if (!data[field.key]) {
          data[field.key] = '';
        }
      }
      content = generator.generateEditForm(this, schema, mode, data);
    } else if (mode === 'edit') {
      title = '编辑';
      content = generator.generateEditForm(this, schema, mode, data);
    } else if (mode === 'copy') {
      title = '复制';
      content = generator.generateEditForm(this, schema, mode, data);
    } else if (mode === 'view') {
      title = '查看';
      content = generator.generateEditForm(this, schema, mode, data);
    } else {
      title = '';
      content = generator.generateEditForm(this, schema, mode, data);
    }

    // 曲线救国的方式 unmount整个modal来避免modal和form配合的bug。。。
    if (visible) {
      return (
        <Modal
          width='85%'
          visible={visible}
          title={title}
          onCancel={handleCancel}
          onOk={this.handleSubmit}
        >
          { content }
        </Modal>
      );
    }
    return (<div />);
  }
}

EditForm.defaultProps = {
  schema: {},
  mode: '',
  data: {},
  visible: false,
  handleOk: () => {},
  handleCancel: () => {}
};

EditForm.propTypes = {
  schema: object,
  mode: string,
  data: object,
  visible: bool,
  handleOk: func,
  handleCancel: func
};
export default Form.create()(EditForm);
