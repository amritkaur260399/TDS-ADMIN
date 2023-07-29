import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table } from 'antd';

const Tablecomponent = () => {
  const columns = [
    {
      title: 'Sr.No.',
      dataIndex: 'SerialNo',
      key: 'Sr.No.',
    },

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Chauffeurs',
      dataIndex: 'Chauffeurs',
      key: 'Chaufferurs',
    },
    {
      title: 'Comment',
      dataIndex: 'Comment',
      key: 'Comment',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      render: (___, record) => (
        <div>
          <div className="flex ">
            <div className="mr-4">
              <a type="primary">
                <span className="text-blue-700">{<CheckOutlined />}</span>
              </a>
            </div>

            <div className="">
              <Popconfirm title="Are you sure ?" okText="Yes" okType="primary" cancelText="No">
                <a type="primary">
                  <span className="text-red-700">
                    <CloseOutlined />
                  </span>
                </a>
              </Popconfirm>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const data = [
    {
      id: 1,
      key: 'name',
      name: 'John',
      SerialNo: '1',
      Chauffeurs: 'navneet',
      Comment: 'bad',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Tablecomponent;
