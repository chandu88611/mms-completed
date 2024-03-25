import { Card, Row, Col, Typography, Divider, Table,Button, Input } from 'antd';
import html2pdf from 'html2pdf.js'
import { useEffect, useState } from 'react';
import InvoiceTable from './Table';
import { useCreateCustomerMutation, useGetCustomersQuery } from '../../redux/services/users';
import { toast } from 'react-toastify';
// import './BillPreview.css'; // Import custom CSS for styling

const { Title } = Typography;

const BillPreview = () => {
  const { data: customers, refetch } = useGetCustomersQuery();

  const [addcustomer]=useCreateCustomerMutation()

  console.log(customers)
  const dummyCustomerData = [
    { id: 1, name: 'John Doe', phone: '1234567890' },
    { id: 2, name: 'Jane Smith', phone: '0987654321' },
  ];
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


  const [someCustomerId,setCustomerID]=useState()
  // const {data:customer,refetch}=useGetCustomersByIdQuery({ id:someCustomerId})
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
    const [date,setDate]=useState(todayFormatted)
   const [subtotal,setSubTotal]=useState()
   const [Discount,setDiscount]=useState(0)
 
   const [ShippingCharge,setShippingCharge]=useState(0)
   const product={
     project_id:"",
     description:"",
     rate:'',
     qty:1,
     amount:'',
     long_description:""
  }
 
  const handleDateChange = (selectedDates, dateStr, instance) => {
   setDate(dateStr);
 };
  const [productDetails,setProducDetails]=useState([product])
  const [currency,setCurrency]=useState(1)
//  const [createinvoice]=useCreateInvoiceMutation()
//  const [createproposal]=useCreateProposalMutation()
//  const {data:customerList}=useGetCustomerListQuery()
  const calculateTotalAmount = () => {
   const totalAmount = productDetails.reduce((sum, product) => {
     return sum + Number(product.amount);
   }, 0);
 
   return isNaN(totalAmount) ? 0 : totalAmount;
 };
 useEffect(()=>{
   if(calculateTotalAmount()!==subtotal){
 
     
       setSubTotal(calculateTotalAmount())
   }
 
 
 },[productDetails])
 
 const handleShippingChargeChange = (e) => {
   const inputValue = e.target.value;
 
 
   if (/^\d*$/.test(inputValue)) {
 
     setShippingCharge(inputValue);
   }
 
 }
 
const [phoneValidationMessage, setPhoneValidationMessage] = useState('');
const [searchedPhoneNumber, setSearchedPhoneNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddFields, setShowAddFields] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const handleSearchCustomer = (value) => {
 
    setSearchedPhoneNumber(value);
    if(value?.trim()==""){
      setSearchResults([])
     
      return
    }
    const results = customers?.data?.filter(customer => customer.phone_number.includes(value));
 
    setSearchResults(results);
  };
  const onFinish = async (values) => {
    try {
      await addcustomer({
        first_name:newCustomerName,
        last_name:newCustomerName,
        phone_number:newCustomerPhone
      });
      toast.success('Customer added successfully');
  
    await  refetch()
    } catch (error) {
      toast.error('Failed to add customer');
    }
  };
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleAddCustomer = async() => {
    if (!newCustomerPhone || !/^\d{10}$/.test(newCustomerPhone)) {
      setPhoneValidationMessage('Please enter a valid 10-digit phone number.');
      return;
    }
await onFinish()


   
  };

  useEffect(()=>{
    if(newCustomerPhone){

      const newCustomer = customers?.data?.filter(customer => customer.phone_number.includes(newCustomerPhone))
      console.log(newCustomer)
      setSelectedCustomer(newCustomer[0]);
      dummyCustomerData.push(newCustomer);
      setShowAddFields(false);
    }
  },[customers])
  return (
    <Card title="Invoice Preview" className="bill-card">
      <Row justify="space-between">
        <Col>
          
          <img src="http://localhost:5173/assets/images/bpo-single-logo-white.png" alt="Logo" className="logo" />
        </Col>
        <Col>
   
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
        {/* Search Customer */}
        {!showAddFields&&!selectedCustomer &&<div style={{display:'flex',gap:'3px'}}>
          <div>

          <Input
            placeholder="Enter Phone Number"
            value={searchedPhoneNumber}
            onChange={(e) => handleSearchCustomer(e.target.value)}
        
          />
          {/* Display Search Results */}
          {searchResults.length > 0 ? (
            <div>
              {searchResults.map(customer => (
                <p key={customer.id} onClick={() => handleSelectCustomer(customer)}>
                  {customer.first_name} - {customer.phone_number}
                </p>
              ))}
            </div>
          ) : (
            <div>
              {searchedPhoneNumber && <p>No customer found</p>}
             
            </div>
          )}
          </div>
           {!searchedPhoneNumber && (
                <Button type="primary" className='bg-blue-500' onClick={() => setShowAddFields(true)}>Add</Button>
              )}
        </div>}
        {showAddFields&&!selectedCustomer && (
            <>
            <div style={{display:'flex',gap:'3px',flexDirection:'column',marginBottom:'6px'}}>

              <Input
                placeholder="Enter Name"
                value={newCustomerName}
                onChange={e => setNewCustomerName(e.target.value)}
             
              />
              <Input
                placeholder="Enter Phone Number"
                value={newCustomerPhone}
                onChange={e =>{ setNewCustomerPhone(e.target.value)
                setPhoneValidationMessage()
                }}
                required
              />
               {phoneValidationMessage && <p style={{ color: 'red' }}>{phoneValidationMessage}</p>}
            </div>
            <div style={{display:'flex',gap:'8px' }}>
              <Button type='primary' className='bg-blue-500' onClick={handleAddCustomer}>Add Customer</Button>
              <Button danger onClick={()=>setShowAddFields(false)}>Cancel</Button>
            </div>
            </>
          )}
        {/* Display Selected Customer Details */}
        {selectedCustomer && (
          <div>
            <Title level={4}>Billed To:</Title>
            <p>{selectedCustomer.first_name}</p>
            <p> {selectedCustomer.phone_number}</p>
            <Button onClick={()=>setSelectedCustomer()}>Change</Button>
          </div>
        )}
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
      <InvoiceTable/>
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
