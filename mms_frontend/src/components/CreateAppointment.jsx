import { Form, Input, Select, DatePicker, TimePicker, Button, Row, Col } from 'antd';
// import './AppointmentForm.css'; // Import custom CSS for styling

const { Option } = Select;

const AppointmentForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Form
      name="appointment-form"
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className="section-title">Patient Details</div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please enter first name!' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please enter last name!' }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="gender"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select placeholder="Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: 'Please enter mobile number!' }]}
          >
            <Input placeholder="Mobile" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please enter address!' }]}
          >
            <Input.TextArea placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>

      <div className="section-title">Appointment Details</div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            name="date"
            rules={[{ required: true, message: 'Please select date of appointment!' }]}
          >
            <DatePicker placeholder="Date of Appointment" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="fromTime"
            rules={[{ required: true, message: 'Please select from time!' }]}
          >
            <TimePicker placeholder="From Time" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="toTime"
            rules={[{ required: true, message: 'Please select to time!' }]}
          >
            <TimePicker placeholder="To Time" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="consultingDoctor"
            rules={[{ required: true, message: 'Please select consulting doctor!' }]}
          >
            <Select placeholder="Consulting Doctor">
              <Option value="doctor1">Doctor 1</Option>
              <Option value="doctor2">Doctor 2</Option>
              <Option value="doctor3">Doctor 3</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="treatment"
            rules={[{ required: true, message: 'Please enter treatment details!' }]}
          >
            <Input placeholder="Treatment" />
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

export default AppointmentForm;
