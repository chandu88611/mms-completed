import { Form, Input, DatePicker, Select, Button, Row, Col } from 'antd';
// import './DepartmentForm.css'; // Import custom CSS for styling

const { Option } = Select;

const DepartmentForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Form
      name="department-form"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="departmentName"
            rules={[{ required: true, message: 'Please enter department name!' }]}
          >
            <Input placeholder="Department Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="departmentHead"
            rules={[{ required: true, message: 'Please enter department head!' }]}
          >
            <Input placeholder="Department Head" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <Input.TextArea placeholder="Description" />
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
            name="status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select placeholder="Status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
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

export default DepartmentForm;
