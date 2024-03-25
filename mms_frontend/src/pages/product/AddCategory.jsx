import React from 'react';
import { Form, Input, Button, Select, Row, Col, Switch } from 'antd';
import { useCreateCategoryMutation } from '../../redux/services/users';


const CategoryForm = ({setclose}) => {
    const [form] = Form.useForm();
    const [addCategory]=useCreateCategoryMutation()
    const onFinish = async(values) => {
      
      const res=await addCategory(values)
      if(res?.data?.status){
        setclose(false)
      }
      // Send a POST request to your Django backend to save the data
    };
  
    return (
      <Form
        form={form}
        name="create_category"
        onFinish={onFinish}
        labelAlign="top"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    initialValues={{ remember: true }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="is_active"
          label="Active"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item >
            <div className='!flex gap-2'>

        <Button className={"!bg-blue-500 text-white !mr-2"} htmlType="submit">
          Submit
        </Button>
    <Button  className={"!bg-red-500 text-white"} onClick={()=>setclose(false)}>{"Cancel"}</Button>
            </div>

      </Form.Item>
      </Form>
    );
  };
  
  export default CategoryForm;
  