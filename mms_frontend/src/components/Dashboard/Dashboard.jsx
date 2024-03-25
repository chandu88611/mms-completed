import React from 'react';
import { Card, Row, Col, Typography, Divider, Table } from 'antd';
import {  UserAddOutlined, SolutionOutlined, MoneyCollectOutlined, CalendarOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';

const { Title } = Typography;

const data = [
  {
    key: '1',
    department: 'Cardiology',
    patients: 25,
  },
  {
    key: '2',
    department: 'Orthopedics',
    patients: 18,
  },
  // Add more departments as needed
];

const columns = [
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Patients',
    dataIndex: 'patients',
    key: 'patients',
  },
];

const pieChartData = {
  options: {
    labels: data.map(item => item.department),
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'], // Add more colors if needed
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },
  series: data.map(item => item.patients)
};
const appointmentData = [
    {
      key: '1',
      patientName: 'John Doe',
      department: 'Cardiology',
      doctor: 'Dr. Smith',
      time: '10:00 AM',
    },
    {
      key: '2',
      patientName: 'Jane Doe',
      department: 'Orthopedics',
      doctor: 'Dr. Johnson',
      time: '11:30 AM',
    },
    // Add more dummy data as needed
  ];

const Dashboard = () => {
    const tableColumns = columns.map(column => ({
        ...column,
        render: (text, record, index) => (
          <strong>{text}</strong> // Make the text bold
        ),
      }));
    //   const components = {
    //     header: {
    //       row: (props) => <thead {...props} style={{ background: '#1890ff', color: 'white', fontWeight: 'bold' , display: 'block' }} />
    //     }
    //   };
  return (
    <div className='p-4 bg-teal-200' style={{zIndex:0}}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            style={{ backgroundImage: 'url("your-image-url")', backgroundSize: 'cover' }}
          >
            <Title level={3}>Good Morning, [User]</Title>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card style={{ backgroundColor: '#c6e3fc' }}>
            <Title level={4} className='!text-[#50a7f3]'>Appointments</Title>
            <UserAddOutlined style={{ fontSize: '32px', marginBottom: '16px' }} />
            <Title level={5}>100</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ backgroundColor: '#E9FFE7' }}>
            <Title level={4} className='!text-[#50a7f3]'>New Patients</Title>
            <UserAddOutlined style={{ fontSize: '32px', marginBottom: '16px' }} />
            <Title level={5}>50</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ backgroundColor: '#FFFBE6' }}>
            <Title level={4} className='!text-[#50a7f3]'>Operations</Title>
            <SolutionOutlined style={{ fontSize: '32px', marginBottom: '16px' }} />
            <Title level={5}>20</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ backgroundColor: '#FFE9EC' }}>
            <Title level={4} className='!text-[#50a7f3]'>Earnings</Title>
            <MoneyCollectOutlined style={{ fontSize: '32px', marginBottom: '16px' }} />
            <Title level={5}>$50,000</Title>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Card>
            <Title level={4} >Today's Appointments</Title>
            <Table dataSource={appointmentData} columns={columns}
            //  bordered
             style={{ borderRadius: '8px' }}
            //  pagination={{ position: ['bottomCenter'] }}
            //  rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
            //  components={components}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Title level={4}>Patients per Department</Title>
            <Chart options={pieChartData.options} series={pieChartData.series} type="pie" width="100%" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
