import { Modal } from 'antd';
import * as schema from './schema';
import CRUD from '../../components/crud';
import Magic from '../../utils/HOC';


export default Magic({
  schema,
  showDelete(props, record, primaryKey) {
    Modal.confirm({
      title: '确认删除',
      content: `当前被选中的行: ${record.code}`,
      onOk: () => {
        props.deleteEntity(record, primaryKey);
      }
    });
  }
})(CRUD);
