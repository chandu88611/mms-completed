import React, { useEffect, useState } from 'react';
import { Button, Modal, Pagination, Space, Table } from 'antd';
import Search from 'antd/es/input/Search';

import AddCustomerForm from './CreateCustomer';
import { useDeleteCustomersMutation, useGetCustomersQuery } from '../../redux/services/users';

const CustomerTable = () => {
  const [visible, setVisible] = useState(false);
  const [deleteCustomerFunc] = useDeleteCustomersMutation();
  const { data: customers, refetch } = useGetCustomersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [addCustomer, setAddCustomer] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState('');

  useEffect(() => {
    const filteredData = customers?.data?.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchText?.toLowerCase())
      )
    );
    setFiltered(filteredData);
    console.log(filteredData)
  }, [searchText, customers]);

  const handleDelete = async (id) => {
    const res = await deleteCustomerFunc({ id });
    if (res?.data?.status) {
      refetch();
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const pageSize = 5; // Number of items per page
  const totalItems = filtered?.length || 0;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      render: (date) => (date ? new Date(date).toLocaleDateString() : '-'),
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive) => (isActive ? 'Yes' : 'No'),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button onClick={() => handleEdit(record)}>Edit</Button>
    //       <Button onClick={() => handleDelete(record.id)}>Delete</Button>
    //     </Space>
    //   ),
    // },
  ];
  return (
    <div className='p-2'>
      {!addCustomer && (
        <div>
          <div className="!flex items-center !justify-between">
            <Search
              placeholder="Search"
              style={{ width: 200, marginBottom: 16 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div>
              <Button
                className={`${addCustomer ? "!bg-red-500 text-white" : " "} mr-2`}
                onClick={() => setAddCustomer(!addCustomer)}
              >
                {addCustomer ? "Cancel" : "Add Customer +"}
              </Button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={filtered?.slice(startIndex, endIndex)}
            pagination={false}
          />
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            showSizeChanger={false}
            showQuickJumper
            className='!ml-auto'
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            onChange={onPageChange}
            itemRender={(current, type, originalElement) => {
              if (type === 'page') {
                let showItem = false;
                if (currentPage <= 2) {
                  showItem = current <= 3;
                } else if (currentPage >= Math.ceil(totalItems / pageSize) - 1) {
                  showItem = current >= Math.ceil(totalItems / pageSize) - 2;
                } else {
                  showItem = current >= currentPage - 1 && current <= currentPage + 1;
                }
                if (!showItem) {
                  return null;
                }
              }
              return originalElement;
            }}
            style={{ marginTop: 16, textAlign: 'right' }}
          />
        </div>
      )}
      {addCustomer && (
        <div className='w-[70%]'>
          {/* Replace AddCustomerForm with your actual form component */}
          <AddCustomerForm setcustomer={setAddCustomer}  refetch={refetch}/>
        </div>
      )}
      <Modal
        title="Edit Customer"
        visible={visible}
        onCancel={() => setVisible(null)}
        footer={null}
      >
        {/* Replace AddCustomerForm with your actual form component */}
        <AddCustomerForm initialValues={visible} />
      </Modal>
    </div>
  );
};

export default CustomerTable;
