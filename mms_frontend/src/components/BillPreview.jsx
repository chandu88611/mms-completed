import { Card, Row, Col, Typography, Divider, Table,Button } from 'antd';
import html2pdf from 'html2pdf.js'
// import './BillPreview.css'; // Import custom CSS for styling

const { Title } = Typography;

const BillPreview = () => {
  // Dummy data for the bill
  const billData = {
    invoiceId: 'INV001',
    invoiceFrom: {
      name: 'Hospital Name',
      address: 'Hospital Address',
      city: 'Hospital City',
      state: 'Hospital State',
      zip: '12345',
      phone: '123-456-7890',
    },
    billedTo: {
      name: 'Customer Name',
      address: 'Customer Address',
      city: 'Customer City',
      state: 'Customer State',
      zip: '54321',
      phone: '987-654-3210',
    },
    paymentDetails: {
      method: 'Credit Card',
      cardNumber: '**** **** **** 1234',
    },
    dates: {
      billedDate: '2022-12-01',
      dueDate: '2022-12-15',
    },
    amounts: {
      subtotal: 1000,
      discount: 100,
      tax: 50,
      total: 950,
    },
    items: [
      { description: 'Item 1', category: 'Category 1', rate: 100, quantity: 2, discount: 10, amount: 180 },
      { description: 'Item 2', category: 'Category 2', rate: 200, quantity: 1, discount: 0, amount: 200 },
    ],
  };

  // Columns for the items table
  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];
  const handleDownload = () => {
    // Select the bill card element
    const billCard = document.querySelector('.bill-card');

    // Configure the PDF options
    const options = {
      margin: 10,
      filename: 'bill.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Convert HTML content to PDF
    html2pdf().from(billCard).set(options).save();
  };

  return (
    <Card title="Invoice Preview" className="bill-card">
      <Row justify="space-between">
        <Col>
          {/* Logo */}
          <img src="http://localhost:5173/assets/images/bpo-single-logo-white.png" alt="Logo" className="logo" />
        </Col>
        <Col>
          {/* Invoice From Details */}
          <div>
            <p>Invoice ID: {billData.invoiceId}</p>
            <p>{billData.invoiceFrom.name}</p>
            <p>{billData.invoiceFrom.address}</p>
            <p>
              {billData.invoiceFrom.city}, {billData.invoiceFrom.state}, {billData.invoiceFrom.zip}
            </p>
            <p>Phone: {billData.invoiceFrom.phone}</p>
          </div>
        </Col>
      </Row>

      <Divider />

      <Row justify="space-between">
        <Col>
          {/* Billed To Details */}
          <div>
            <Title level={4}>Billed To:</Title>
            <p>{billData.billedTo.name}</p>
            <p>{billData.billedTo.address}</p>
            <p>
              {billData.billedTo.city}, {billData.billedTo.state}, {billData.billedTo.zip}
            </p>
            <p>Phone: {billData.billedTo.phone}</p>
          </div>
        </Col>
        <Col>
          {/* Payment Details */}
          <div>
            <Title level={4}>Payment Details:</Title>
            <p>Method: {billData.paymentDetails.method}</p>
            <p>Card Number: {billData.paymentDetails.cardNumber}</p>
          </div>
        </Col>
      </Row>

      <Divider />

      <Row justify="center" className="purple-row">
        <Col className='flex !justify-between w-full bg-teal-500 px-3 py-4 rounded text-[15px] font-bold text-white'>
          {/* Dates */}
          <p>Billed Date: {billData.dates.billedDate}</p>
          <p>Due Date: {billData.dates.dueDate}</p>
          <p>Due Amount: ${billData.amounts.total}</p>
        </Col>
      </Row>

      <Divider />

      {/* Items Table */}
      <Table dataSource={billData.items} columns={columns} pagination={false} />

      <Divider />

      <Row justify="end">
        {/* Summary */}
        <Col>
          <p>Subtotal: ${billData.amounts.subtotal}</p>
          <p>Discount: ${billData.amounts.discount}</p>
          <p>Tax: ${billData.amounts.tax}</p>
          <Title level={3}>Total: ${billData.amounts.total}</Title>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          {/* Download button */}
          <Button type="primary" onClick={handleDownload}>Download</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default BillPreview;
