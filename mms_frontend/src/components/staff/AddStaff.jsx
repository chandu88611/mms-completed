import React from 'react';
import { Form, Input, Button, Select, DatePicker, Row, Col, Checkbox, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';

const { Option } = Select;
const { TextArea } = Input;

const AddStaffForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (

    <Form
    name="add-staff-form"
    // placeholderCol={{ span: 8 }}
    // wrapperCol={{ span: 16 }}
    onFinish={onFinish}
    autoComplete="off"
    className='p-10'
  >
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
          
          name="firstName"
          rules={[{ required: true, message: 'Please enter first name!' }]}
        >
          <Input  className='p-2' placeholder="First Name"/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
      
          name="lastName"
          rules={[{ required: true, message: 'Please enter last name!' }]}
        >
          <Input  className='p-2'     placeholder="Last Name"/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
        
          name="username"
          rules={[{ required: true, message: 'Please enter username!' }]}
        >
          <Input  className='p-2'   placeholder="Username"/>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          
          name="email"
          rules={[
            { required: true, message: 'Please enter email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input  className='p-2' placeholder="Email"/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
         
          name="password"
          rules={[{ required: true, message: 'Please enter password!' }]}
        >
          <Input.Password   placeholder="Password" className='p-2'/>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
         
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password   placeholder="Confirm Password" className='p-2'/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
         
          name="dob"
          rules={[{ required: true, message: 'Please select date of birth!' }]}
        >
          <DatePicker style={{ width: '100%' }}   placeholder="Date of Birth" className='p-2'/>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
        
          name="gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select placeholder="Select gender" className='h-10'>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
      
          name="education"
          rules={[{ required: true, message: 'Please enter education details!' }]}
        >
          <Input  className='p-2'     placeholder="Education"/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
       
          name="designation"
          rules={[{ required: true, message: 'Please enter designation!' }]}
        >
          <Input  className='p-2'    placeholder="Designation"/>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
        //   placeholder="Department"
          name="department"
          className=''
          rules={[{ required: true, message: 'Please select department!' }]}
        >
          <Select placeholder="Select department" className='h-10'>
            <Option value="department1">Department 1</Option>
            <Option value="department2">Department 2</Option>
            <Option value="department3">Department 3</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
      
          name="address"
          rules={[{ required: true, message: 'Please enter address!' }]}
        >
          <TextArea      placeholder="Address"/>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
        
          name="city"
          rules={[{ required: true, message: 'Please enter city!' }]}
        >
          <Input  className='p-2'   placeholder="City"/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          
          name="country"
          rules={[{ required: true, message: 'Please enter country!' }]}
        >
          <Input  className='p-2' placeholder="Country"/>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
         
          name="state"
          rules={[{ required: true, message: 'Please enter state!' }]}
        >
          <Input  className='p-2 '  placeholder="State"/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          
          name="postalCode"
          rules={[{ required: true, message: 'Please enter postal code!' }]}
        >
          <Input  className='p-2' placeholder="Postal Code"/>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          placeholder="Photo"
          name="photo"
          rules={[{ required: true, message: 'Please upload photo!' }]}
        >
 <Upload
    maxCount={1}
    beforeUpload={() => false} // To prevent file upload
    fileList={[]} // Empty array to ensure no initial files are shown
  >
    <Button icon={<UploadOutlined />}>Upload Photo</Button>
  </Upload>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
         
          name="activeStatus"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Active</Checkbox>
          <Checkbox>In Active</Checkbox>
        </Form.Item>
      </Col>
    </Row>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  );
};

export default AddStaffForm;
