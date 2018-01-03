import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import generator from '../../utils/generator';
import { SHOW_TYPE } from '../../common/constant';

import * as style from './style.scss';

moment.locale('zh-cn');

/**
 * 内部表单组件
 */
class SearchForm extends React.Component {
  /**
   * 表单的查询条件不能直接传给后端, 要处理一下
   *
   * @param oldObj
   * @returns {{}}
   */
  filterQueryObj(oldObj) {
    // 将提交的值中undefined的去掉
    const newObj = {};
    for (const key in oldObj) {
      if (oldObj[key]) {
        // 对于js的日期类型, 要转换成字符串再传给后端
        if (oldObj[key] instanceof Date) {
          newObj[key] = oldObj[key].format('yyyy-MM-dd HH:mm:ss');
        } else {
          newObj[key] = oldObj[key];
        }
      }
    }
    return newObj;
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleClick(e, f, isReset) {
    e.preventDefault();
    if (isReset) {
      this.handleReset(e);
      return;
    }

    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newData = {};
        for (const key in values) {
          if (values[key] !== '') { newData[key] = values[key]; }
        }
        f(e, newData);
      }
    });
  }

  render() {
    // 表单的前面是一堆输入框, 最后一行是按钮
    return (
      <div className={style.formLayout}>
        {generator.generateForm(this)}
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields: (props) => {
    const obj = {};
    const { queryObj } = props;
    const { fields } = props.schema;
    if (!fields || !Array.isArray(fields) || !queryObj) {
      return obj;
    }

    for (let i = 0; i < fields.length; i += 1) {
      const {
        queryObjKey, key, initialValue, showType
      } = fields[i];
      let value;

      if (showType === SHOW_TYPE.DATERANGE) {
        try {
          if (queryObjKey) {
            value = [eval(`queryObj.${queryObjKey}[0]`), eval(`queryObj.${queryObjKey}[1]`)];
          } else if (queryObj.param) {
            const _v = eval(`queryObj.param.${key}`);
            if (_v) { value = [..._v]; }
          }
        } catch (e) {
          value = undefined;
        }

        if (!value) {
          if (initialValue) {
            value = [moment(initialValue[0]), moment(initialValue[1])];
          } else {
            value = [moment((new Date()) - (3 * 86400000)), moment(new Date())];
          }
        }

        obj[key] = { value };
        continue;
      }

      try {
        if (queryObjKey) {
          value = eval(`queryObj.${queryObjKey}`);
        } else if (queryObj.param) {
          value = eval(`queryObj.param.${key}`);
        }
      } catch (e) {
        value = undefined;
      }

      if (!value && !initialValue) {
        value = initialValue;
      }

      value = value || '';

      obj[key] = { value };
    }

    return obj;
  }
})(SearchForm);
