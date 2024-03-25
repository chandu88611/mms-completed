import React, { useEffect, useState } from 'react'
// import "flatpickr/dist/themes/material_green.css";
// import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { toast } from 'react-toastify';
import { useCreateInvoiceMutation, useCreateProposalMutation, useGetCustomerListQuery } from '../../../../redux/services/bdo';
import { useGetCustomersByIdQuery } from '../../../../redux/services/imageUpload';
function InvoiceCreateForm({close,data,type,refetcch}) {

  const [productCount,setProductCount]=useState(1)

  const [createInvoice,setCreatInvoice]=useState(false)
  const [someCustomerId,setCustomerID]=useState()
 const {data:customer,refetch}=useGetCustomersByIdQuery({ id:someCustomerId})
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
const [createinvoice]=useCreateInvoiceMutation()
const [createproposal]=useCreateProposalMutation()
const {data:customerList}=useGetCustomerListQuery()
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


useEffect(()=>{
  setCurrency(customer?.currencies?.filter(data=>data?.status==1)[0])
  },[customer])

useEffect(()=>{
if(someCustomerId){
  refetch()
}
},[someCustomerId])
const onSubmit=async(mail)=>{
  if (!productDetails.every(product => product.project_id)) {
    toast.error("Select At Least One Product");
    return;
  }

  if(type=="proposal"){
    const res=await createproposal({
      customer_id:customer?.data?.id,
  tax_number:customer?.data?.gst_no,
  items:productDetails,
  sub_total:subtotal,
  total_amount:parseFloat(subtotal+parseFloat(Math.round((subtotal*18)/100))-parseFloat(Math.round(((parseFloat(parseFloat(ShippingCharge||0)+subtotal+parseFloat(Math.round((subtotal*18)/100))))*Discount)/100)))+parseFloat(ShippingCharge||0),
  tax_percentage:18,
  tax_amount:parseFloat(Math.round((subtotal*18)/100)),
  shipping_charge:ShippingCharge,
  date:date,
  currency:currency?.id,
  discount_percentage:Discount,
  discount_amount:parseFloat(Math.round((subtotal*Discount)/100)),
  mail_send:mail
    })
  
    if(res?.data?.status){
      toast.success(res.data.message)
      close(false)
      setTimeout(()=>{

        refetcch()
      },1500)
   
    }else{
      toast.error(res.data.message)
    }
  }else{

    const res=await createinvoice({
      customer_id:customer?.data?.id,
  tax_number:customer?.data?.gst_no,
  items:productDetails,
  sub_total:subtotal,
  total_amount:parseFloat(subtotal+parseFloat(Math.round((subtotal*18)/100))-parseFloat(Math.round(((parseFloat(parseFloat(ShippingCharge||0)+subtotal+parseFloat(Math.round((subtotal*18)/100))))*Discount)/100)))+parseFloat(ShippingCharge||0),
  tax_percentage:18,
  tax_amount:parseFloat(Math.round((subtotal*18)/100)),
  shipping_charge:ShippingCharge,
  date:date,
  currency:currency.id,
  discount_percentage:Discount,
  discount_amount:parseFloat(Math.round((subtotal*Discount)/100)),
  mail_send:mail
    })
  
    if(res?.data?.status){
      toast.success(res.data.message)
      close(false)
      setTimeout(()=>{

        refetcch()
      },1500)
   
    }else{
      toast.error(res.data.message)
    }
  }
}
  return (
    <div className="card " >
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1 capitalize">Create {type}</h5>
                <button className="btn btn-danger btn-sm" id="hideCreateProposal" onClick={()=>close(false)}>
                  <i className="ri-close-line align-bottom" /> Close{" "}
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="col-lg-3 mb-3 mx-auto">
                {/* <label for="" class="mt-3">Select Customer/Client</label> */}
                <select
                  className="form-control"
                  id=""
                  placeholder="product"
                  name="country"
                  onChange={(e)=>setCustomerID(e.target.value)}
                >
                  <option value="" disabled="" selected="">
                    Select Customer/Client
                  </option>
                  {customerList?.data?.map((data,i)=>(

                  <option value={data?.id} key={i+"customer"}>{data?.first_name+" "+data?.last_name}</option>
                  ))}
                  
                </select>
              </div>
              <hr />
              <div className="col-lg-12">
              {someCustomerId&&<form
        className="needs-validation"
        noValidate=""
        id="invoice_form"
      >
        <div className="card-body border-bottom border-bottom-dashed px-4 pb-4 pt-0">
          <div className="row">
            <div className="col-lg-12">
              <img
                src="/assets/images/bpo-single-logo.png"
                className="card-logo card-logo-dark user-profile-image img-fluid m-auto"
                alt="logo dark"
              />
            </div>
            <div className="col-lg-4">
              <div>
              <p className="mb-0 test-dark fw-bold fs-16">
                  BPO Projects India
                </p>
                <p className="mb-0 test-dark fs-14">
                Level 2, Phase 6, Near Tata Consultancy Services, 
                  <br /> Manyata Tech Park Hebbal Outer Ring Road
                </p>
                <p className="mb-0 test-dark fs-14">
                 Bangalore, Karnataka
                </p>
                <p className="mb-0 test-dark fs-14">India - 560045</p>
                <p className="mb-0 test-dark fs-14">
                  GST - GSTIN5415560016
                </p>
                <p className="mb-0 test-dark fs-14">
                  +91 90361 56001
                </p>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-4 ms-auto">
              <div className="text-end">
                <p className="mb-0 test-dark fw-bold fs-16">
                  {customer?.data?.first_name} {customer?.data?.last_name}
                </p>
                <p className="mb-0 test-dark fs-14">
                {customer?.customer_address?.shipping_address}
                {!customer?.customer_address?.shipping_address&&<span className='text-danger font-semibold'>Pleade Update Your Shipping Address</span>}
                </p>
                <p className="mb-0 test-dark fs-14">
                {customer?.customer_address?.shipping_city}, {customer?.customer_address?.shipping_state}
                </p>
                <p className="mb-0 test-dark fs-14">{customer?.customer_address?.shipping_country} - {customer?.customer_address?.shipping_zip}</p>
                <p className="mb-0 test-dark fs-14">
                  GST - {customer?.data?.gst_no}
                </p>
                <p className="mb-0 test-dark fs-14">
                {customer?.data?.phone}
                </p>
              </div>
            </div>
          </div>
          {/*end row*/}
        </div>
        <div className="card-body p-4">
          <div className="row g-3">
       
            {/*end col*/}
            <div className="col-lg-3 col-sm-6">
              <div>
                <label htmlFor="date-field">Date</label>
                <Flatpickr
                  type="text"
                  className="form-control bg-light border-0"
                  value={date}
                  onChange={handleDateChange}
                  options={{
                    maxDate:new Date()
                  }}
                  data={true}
                  placeholder="Select Date"
                />
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3 col-sm-6">
              <div>
                <label htmlFor="totalamountInput">
                  Total Amount (auto calculated)
                </label>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  id="totalamountInput"
                  placeholder="₹0.00"
                  readOnly={true}
                              value={parseFloat(subtotal+parseFloat(Math.round((subtotal*18)/100))-parseFloat(Math.round((subtotal*Discount)/100)))+parseFloat(ShippingCharge||0)}
                />
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        <div className="card-body p-4 border-top border-top-dashed">
          <div className="row">
            <div className="col-12">
              <div>
                <label
                  htmlFor="billingName"
                  className="text-muted text-uppercase fw-semibold"
                >
                  Billing Details
                </label>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="mb-2">
              <label htmlFor="totalamountInput">
              Name
                </label>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  id="billingName"
                  placeholder="Full Name"
                 value={customer?.data?.first_name+" "+customer?.data?.last_name}
                  readOnly=""
                  required=""
                />
                <div className="invalid-feedback">
                  Please enter a full name
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-4 col-sm-6">
              <div className="mb-2">
              <label htmlFor="totalamountInput">
              phone number
                </label>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  data-plugin="cleave-phone"
                  id="billingPhoneno"
                  placeholder="(123)456-7890"
                 value={customer?.data?.phone}
                  readOnly=""
                  required=""
                />
                <div className="invalid-feedback">
                  Please enter a phone number
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-4 col-sm-6">
              <div className="mb-3">
              <label htmlFor="totalamountInput">
              Tax Number
                </label>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  id="billingTaxno"
                  placeholder="Tax Number"
                  value={customer?.data?.gst_no}
                  required=""
                />
                <div className="invalid-feedback">
                  Please enter a tax number
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-12 col-sm-12">
              <div className="mb-2">
              <label htmlFor="totalamountInput">
              Address
                </label>
                <textarea
                  className="form-control bg-light border-0"
                  id="billingAddress"
                  rows=""
                  placeholder="Address"
                  required=""
                  readOnly=""
                  value={customer?.customer_address?.billing_address}
                />
                <div className="invalid-feedback">
                  Please enter a address
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="invoice-table table table-borderless table-nowrap mb-0">
              <thead className="align-middle">
                <tr className="table-active">
                  <th scope="col" style={{ width: 50 }}>
                    #
                  </th>
                  <th scope="col">Product Details</th>
                  <th scope="col" style={{ width: 120 }}>
                    <div className="d-flex currency-select input-light align-items-center">
                      Rate
                      <select
                        className="form-selectborder-0 form_control bg-light"
                        data-choices=""
                        data-choices-search-false=""
                        id="choices-payment-currency"
                      
                       onChange={(e) => setCurrency(customer?.currencies?.filter(curr => curr.id == e.target.value)[0])}
                      >
                       {customer?.currencies?.map((data,i)=>(

<option value={data?.id} selected={data?.status==1}>{data?.symbol}</option>
))}
                        
                      </select>
                    </div>
                  </th>
                  <th scope="col" style={{ width: 120 }}>
                    Quantity
                  </th>
                  <th scope="col" className="" style={{ width: 150 }}>
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="text-end"
                    style={{ width: 105 }}
                  />
                </tr>
              </thead>
              <tbody id="newlink">
                {productDetails?.map((data1,i)=>(

                <tr id={1} className="product">
                  <th scope="row" className="product-id">
                    {i+1}
                  </th>
                  <td className="text-start">
                    <div className="mb-2">
                      <select
                        className="form-control"
                        id=""
                        placeholder="product"
                        name="country"
                        onChange={(e)=>{
                            setProducDetails((prev) => {
                                const updatedProductDetails = [...prev];
                                console.log(updatedProductDetails)
                                const filter=customer?.projects?.filter(data=>data.id==e.target.value)
                                if(filter?.length<1){
                                  return [product]
                                }
                                updatedProductDetails[i].project_id = e.target.value;
                                updatedProductDetails[i].rate = filter[0].rate;
                                updatedProductDetails[i].description = filter[0].name;
                                updatedProductDetails[i].long_description = filter[0].project_description;
                                updatedProductDetails[i].amount = productDetails[i].rate*productDetails[i].qty
                                
                                return updatedProductDetails;
                              });
                        }}
                      >
                        <option value={product} disabled="" selected="">
                          Select Product
                        </option>
                        {customer?.projects?.length>0&&customer?.projects?.map((data,i)=>(
                        <option value={data?.id}>{data?.name}</option>
                        ))}
                       
                      </select>
                    </div>
                    <textarea
                      className="form-control bg-light border-0"
                      id="productDetails-1"
                      rows={2}
                      placeholder="Product Description"
                      value={productDetails[i].long_description}
readOnly={true}
                    
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control product-price bg-light border-0"
                      id="productRate-1"
                      step="0.01"
                      value={productDetails[i].rate}
                      placeholder={0.0}
                      required=""
                    />
                    <div className="invalid-feedback">
                      Please enter a rate
                    </div>
                  </td>
                  <td>
                    <div className="input-step">
                      <button type="button" className="minus"  onClick={(e)=>{
                        if(productDetails[i].qty==1){
                            return
                        }
                            setProducDetails((prev) => {
                                const updatedProductDetails = [...prev];
                                updatedProductDetails[i].qty = updatedProductDetails[i].qty-1;
                                updatedProductDetails[i].amount = productDetails[i].rate*productDetails[i].qty
                                return updatedProductDetails;
                              });
                        }}>
                        –
                      </button>
                      <input
                        type="text"
                        className="product-quantity"
                        id="product-qty-1"
                        value={productDetails[i].qty}
            
                      />
                      <button type="button" className="plus"  onClick={(e)=>{
                         if(productDetails[i].qty==100){
                          return
                        }
                            setProducDetails((prev) => {
                                const updatedProductDetails = [...prev];
                                updatedProductDetails[i].qty = updatedProductDetails[i].qty+1;
                                updatedProductDetails[i].amount = productDetails[i].rate*productDetails[i].qty
                                return updatedProductDetails;
                              });
                        }}>
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-end">
                    <div>
                      <input
                        type="text"
                        className="form-control bg-light border-0 product-line-price"
                        id="productPrice-1"
                        value={productDetails[i].amount}
                        readOnly=""
                      />
                    </div>
                  </td>
                  {i>0&&<td className="product-removal">
                    <a
                      onClick={()=>{
                      
                        setProducDetails(productDetails.filter((data,index)=>i!=index))
                      }}
                      className="btn btn-success"
                    >
                      Delete
                    </a>
                  </td>}
                </tr>
                ))}
              </tbody>
              <tbody>
                <tr id="newForm" style={{ display: "none" }} >
                  <td className="d-none" colSpan={5}>
                    <p>Add New Form</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5}>
                    <a
                     
                      id="add-item"
                      className="btn btn-soft-secondary fw-medium"
                      onClick={()=>setProducDetails([...productDetails,product])}
                    >
                      <i className="ri-add-fill me-1 align-bottom" />{" "}
                      Add Item
                    </a>
                  </td>
                </tr>
                <tr className="border-top border-top-dashed mt-2">
                  <td colSpan={3} />
                  <td colSpan={2} className="p-0">
                    <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Sub Total {currency?.symbol}</th>
                          <td style={{ width: 150 }}>
                            <input
                              type="text"
                              className="form-control bg-light border-0"
                              id="cart-subtotal"
                              placeholder="₹0.00"
                              value={subtotal}
                              readOnly={true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            Discount %
                           
                          </th>
                          <td>
                            <input
                              type="text"
                              className="form-control bg-light border-0"
                              id="cart-discount"
                              value={Discount}
                              onChange={(e)=>{
                                const dis=e.target.value
                                if (/^\d*$/.test(dis)) {
                               
                                  setDiscount(Math.min(Math.max(parseInt(dis, 10) || 0, 0), 100));
                              }

                              }}
                              placeholder="0%"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Tax (18%) {currency?.symbol}</th>
                          <td>
                            <input
                              type="text"
                              className="form-control bg-light border-0"
                              id="cart-tax"
                              placeholder="₹0.00"
                              value={Math.round((subtotal*18/100))}
                              readOnly={true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Shipping Charge {currency?.symbol}</th>
                          <td>
                            <input
                              type="text"
                              className="form-control bg-light border-0"
                              id="cart-shipping"
                              placeholder="₹0.00"
                              value={ShippingCharge}
                              onChange={handleShippingChargeChange}
                            />
                          </td>
                        </tr>
                        <tr className="border-top border-top-dashed">
                          <th scope="row">Total Amount {currency?.symbol}</th>
                          <td>
                            <input
                              type="text"
                              className="form-control bg-light border-0"
                              id="cart-total"
                              placeholder="₹0.00"
                              readOnly={true}
                              value={parseFloat(subtotal+parseFloat(Math.round((subtotal*18)/100))-parseFloat(Math.round(((parseFloat(parseFloat(ShippingCharge||0)+subtotal+parseFloat(Math.round((subtotal*18)/100))))*Discount)/100)))+parseFloat(ShippingCharge||0)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/*end table*/}
                  </td>
                </tr>
              </tbody>
            </table>
            {/*end table*/}
          </div>
          <div className="mt-4">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label text-muted text-uppercase fw-semibold"
            >
              NOTES
            </label>
            <textarea
              className="form-control alert alert-info"
              id="exampleFormControlTextarea1"
              placeholder="Notes"
              rows={2}
              required=""
              defaultValue={
                "All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above."
              }
            />
          </div>
          <div className="hstack gap-2 justify-content-end d-print-none mt-4">
            <div  className="btn btn-success bg-[#3cd188] capitalize"   onClick={()=>onSubmit(true)}
>
              <i className="ri-printer-line align-bottom me-1" /> Save and Send {type}
            </div>
          
            <a
              href="javascript:void(0);"
              className="btn btn-secondary capitalize"
              onClick={()=>onSubmit(false)}
            >
              <i className="ri-send-plane-fill align-bottom me-1" />{" "}
              Create {type}
            </a>
          </div>
        </div>
      </form>}
              </div>
            </div>
          </div>
  )
}

export default InvoiceCreateForm