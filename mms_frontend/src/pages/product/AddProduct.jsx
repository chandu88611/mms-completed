import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { useCreateProductMutation, useGetCategoriesQuery, useUpdateProductMutation } from '../../redux/services/users';
import { toast } from 'react-toastify';
// import 'antd/dist/antd.css';

const ProductForm = ({setclose,initialValues = {},refetch}) => {
  const [ini,setIni]=useState({})
  const [form] = Form.useForm();
  const [addProductFunc]=useCreateProductMutation()
  const [update]=useUpdateProductMutation()
  const{data:categories}=useGetCategoriesQuery()
  console.log(categories)
  const onFinish =async (values) => {
    if(initialValues?.id){
        const res=await update({id:initialValues?.id,body:values})
      
        if(res?.data?.status){
         console.log(res?.data?.message)
         toast.success(res?.data?.message)
        //  setclose(false)
        //  refetch()
        }
        return
    }
   try {
    
       const res=await addProductFunc(values)
       console.log(res)
       if(res?.data?.status){
        console.log(res?.data?.message)
        toast.success(res?.data?.message)
        setclose(false)
        // refetch()
       }else{
      
        toast.error("Product With Name Already Exists")
       }
   } catch (error) {
    
   }
    // Send a POST request to your Django backend to save the data
  };
  useEffect(() => {
    form.setFieldsValue(initialValues); // Set initial values when they are available
  }, [initialValues, form]);
  return (
    <Form
    form={form}
    name="create_product"
    onFinish={onFinish}
    labelAlign="top"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    // initialValues={ini}

  
    >
      <Row gutter={[16, 8]} style={{ marginTop: '-8px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select the category!' }]}
          >
           <Select>
              {categories &&
                categories?.data?.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]} style={{ marginTop: '-8px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter the price!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="price_per_pack"
            label="Price Per Pack"
            rules={[{ required: true, message: 'Please enter the price per pack!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]} style={{ marginTop: '-8px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="price_per_sheet"
            label="Price Per Sheet"
            rules={[{ required: true, message: 'Please enter the price per sheet!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="expiration_date"
            label="Expiration Date"
            rules={[{ required: true, message: 'Please enter the expiration date!' }]}
          >
            <Input type="date" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]} style={{ marginTop: '-8px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="batch_number"
            label="Batch Number"
            rules={[{ required: true, message: 'Please enter the batch number!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="serial_number"
            label="Serial Number"
            rules={[{ required: true, message: 'Please enter the serial number!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]} style={{ marginTop: '-8px' }}>
        {/* <Col xs={24} sm={12}>
          <Form.Item
            name="barcode"
            label="Barcode"
            rules={[{ required: true, message: 'Please enter the barcode!' }]}
          >
            <Input />
          </Form.Item>
        </Col> */}
        <Col xs={24} sm={12}>
          <Form.Item
            name="tablets_per_sheet"
            label="Tablets Per Sheet"
            rules={[{ required: true, message: 'Please enter the tablets per sheet!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]} style={{ marginTop: '-8px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="sheets_per_pack"
            label="Sheets Per Pack"
            rules={[{ required: true, message: 'Please enter the sheets per pack!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter the quantity!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className='flex gap-6'>
        <Button className={"!bg-blue-500 text-white !mr-2"} htmlType="submit">
          Submit
        </Button>
    <Button  className={"!bg-red-500 text-white"} onClick={()=>setclose(false)}>{"Cancel"}</Button>

      </Form.Item>
    </Form>
  );
};

export default ProductForm;
