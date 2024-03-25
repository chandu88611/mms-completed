 

import React, { useState } from 'react';
import { Table, Input, Select, Button, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;


const InvoiceTable = ({ customer, currency }) => {
    const defaultProduct = {
      key: '0',
      project_id: '',
      rate: 0,
      qty: 1,
      amount: 0,
      pack:1,
      sheets:1
    };
  const [productDetails, setProductDetails] = useState([defaultProduct]);
  const [subtotal, setSubtotal] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [ShippingCharge, setShippingCharge] = useState(0);
  const dummyProducts = [
    { id: 1, name: 'Product 1', rate: 10   },
    { id: 2, name: 'Product 2', rate: 20   },
    { id: 3, name: 'Product 3', rate: 30   }
  ];
  const handleShippingChargeChange = (e) => {
    setShippingCharge(e.target.value);
  };

  const handleProductChange = (value, index) => {
      const updatedProductDetails = [...productDetails];
      const selectedProduct = dummyProducts.find((product) => product.id === value);
      
      if (selectedProduct) {
          updatedProductDetails[index].project_id = selectedProduct.id;
          updatedProductDetails[index].rate = selectedProduct.rate;
          updatedProductDetails[index].amount = selectedProduct.rate * updatedProductDetails[index].qty;
          // Recalculate subtotal
          const newSubtotal = updatedProductDetails.reduce((acc, item) => acc + item.amount, 0);
          setSubtotal(newSubtotal);
          setProductDetails(updatedProductDetails);
          console.log(updatedProductDetails)
    }
  };
  
  const handleQuantityChange = (value, index) => {
    const updatedProductDetails = [...productDetails];
    updatedProductDetails[index].qty = value;
    updatedProductDetails[index].amount = updatedProductDetails[index].rate * value;
    // Recalculate subtotal
    const newSubtotal = updatedProductDetails.reduce((acc, item) => acc + item.amount, 0);
    setSubtotal(newSubtotal);
    setProductDetails(updatedProductDetails);
  };

  const handleAddProduct = () => {
    setProductDetails([...productDetails, { ...defaultProduct, key: `${productDetails.length}` }]);
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      render: (_, record, index) => index + 1
    },
    {
      title: 'Product Details',
      dataIndex: 'productDetails',
      render: (_, record) => (
        <>
      <Select
      showSearch
  style={{ width: 200 }}
  placeholder="Select Product"
  onChange={(value) => {
    const updatedDetails = handleProductChange(value, record.key);

  }}
  filterOption={(input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
>
  {dummyProducts.map((product) => (
    <Option key={product.name} value={product.id}>
      {product.name}
    </Option>
  ))}
</Select>
           
        </>
      )
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      render: (_, record) => (
        <Input
          type="number"
          step="0.01"
          value={record.rate}
          readOnly
        />
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      render: (_, record) => (
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleQuantityChange(record.qty - 1, record.key)}
          />
          <Input
            type="number"
            value={record.qty}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value), record.key)}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleQuantityChange(record.qty + 1, record.key)}
          />
        </Space>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (_, record) => (
        <Input
          value={record.amount}
          readOnly
        />
      )
    },    {
        title: 'Remove',
        dataIndex: 'remove',
        render: (_, record) => (
            productDetails.length > 1 ? (
              <Button danger onClick={() => {
                setProductDetails(productDetails.filter(data => data.key !== record.key));
              }}>
                Delete
              </Button>
            ) : null )
      }
  ];

  return (
    <Table
      columns={columns}
      dataSource={productDetails}
      pagination={false}
      footer={() => (
        <Space direction="vertical">
          <Input.Group compact>
            <Input
              style={{ width: '50%' }}
              addonBefore="Sub Total"
              addonAfter={currency.symbol}
              value={subtotal}
              readOnly
            />
          </Input.Group>
        </Space>
      )}
      footer={() => (
        <tr>
          <td colSpan={5}>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </td>
        </tr>
      )}
    />
  );
};

export default InvoiceTable;
