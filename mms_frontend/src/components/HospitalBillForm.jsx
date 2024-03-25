import { Form, Input, DatePicker, Select, Button, Row, Col } from 'antd';
// import './HospitalBillForm.css'; // Import custom CSS for styling

const { Option } = Select;

const HospitalBillForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Form
      name="hospital-bill-form"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="customer"
            rules={[{ required: true, message: 'Please select customer!' }]}
          >
            <Select placeholder="Select Customer">
              <Option value="customer1">Customer 1</Option>
              <Option value="customer2">Customer 2</Option>
              <Option value="customer3">Customer 3</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter phone number!' }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            rules={[{ required: true, message: 'Please select date!' }]}
          >
            <DatePicker placeholder="Date" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="items"
            rules={[{ required: true, message: 'Please enter items!' }]}
          >
            <Input.TextArea placeholder="Items" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="from"
            rules={[{ required: true, message: 'Please enter from place!' }]}
          >
            <Input placeholder="From" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="to"
            rules={[{ required: true, message: 'Please enter to place!' }]}
          >
            <Input placeholder="To" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="summary"
            rules={[{ required: true, message: 'Please enter summary!' }]}
          >
            <Input.TextArea placeholder="Summary" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Generate Bill
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HospitalBillForm;
