import React from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import { useCreateCustomerMutation } from '../../redux/services/users';
import { toast } from 'react-toastify';

const AddCustomerForm = ({setcustomer,refetch}) => {
    const [addcustomer]=useCreateCustomerMutation()
  const onFinish = async (values) => {
    try {
      await addcustomer(values);
      toast.success('Customer added successfully');
      setcustomer(false)
      refetch()
    } catch (error) {
      toast.error('Failed to add customer');
    }
  };

  return (
    <Form
    labelAlign="top"
      name="add-customer"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Form.Item
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: 'Please input the first name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: 'Please input the last name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: 'email', message: 'Please enter a valid email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone_number"
        rules={[{ required: true, message: 'Please input the phone number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="date_of_birth"
      >
        <DatePicker />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Customer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCustomerForm;
