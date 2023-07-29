import { EditOutlined } from '@ant-design/icons';

export const tabs = [
  {
    title: 'All',
    key: 'ALL',
  },
  {
    title: 'Active',
    key: 'ACTIVE',
  },
  {
    title: 'Inactive',
    key: 'INACTIVE',
  },
  {
    title: 'Awaiting response',
    key: 'AWAITING',
  },
];

function formatPhoneNumber(phoneNumberString) {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[3]].join('');
  }
  return null;
}
function capitalizeFirstWord(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const columns = [
  {
    title: 'Name',
    key: 'member',
    render: (_, record) => (
      <span className="capitalize ">{`${record?.firstName} ${record?.lastName}` || 'N/A'}</span>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (data) => <span className="">{data || 'N/A'}</span>,
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
    render: (_, record) => (
      <span className="">
        {`${record?.phoneNumber?.countryCode} ${formatPhoneNumber(record?.phoneNumber?.number)}` ||
          'N/A'}
      </span>
    ),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (__, data) => <span className="">{capitalizeFirstWord(data?.role) || 'N/A'}</span>,
  },
];
