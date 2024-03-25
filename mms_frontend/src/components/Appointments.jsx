import { Button, Modal, Pagination, Space, Table } from 'antd';
import Search from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
// import CreateForm from '../pages/product/AddProduct';
import ProductForm from '../pages/product/AddProduct';
import CategoryForm from '../pages/product/AddCategory';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../redux/services/users';
// import './CustomTable.css'; // Import custom CSS for styling


const AppointmentTable = () => {
  const [visible, setVisible] = useState(false);
  const [deleteProductFunc] = useDeleteProductMutation();


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Price Per Pack',
      dataIndex: 'price_per_pack',
      key: 'price_per_pack',
    },
    {
      title: 'Price Per Sheet',
      dataIndex: 'price_per_sheet',
      key: 'price_per_sheet',
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
    },
    {
      title: 'Batch Number',
      dataIndex: 'batch_number',
      key: 'batch_number',
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
    },
    // {
    //   title: 'Tablets Per Sheet',
    //   dataIndex: 'tablets_per_sheet',
    //   key: 'tablets_per_sheet',
    // },
    // {
    //   title: 'Sheets Per Pack',
    //   dataIndex: 'sheets_per_pack',
    //   key: 'sheets_per_pack',
    // },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button className='bg-blue-500 text-white  hover:!text-white' style={{ marginRight: 8 }} onClick={() => setVisible(record)}>Edit</Button>
          <Button className='bg-red-500 text-white hover:!text-white' onClick={() => handleDelete(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];
  
  const {data:products,refetch}=useGetProductsQuery()
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleEdit = (record) => {
    // Implement edit functionality here
  };


  
  const handleDelete = async(id) => {
   const res=await deleteProductFunc({id})
   if(res?.data?.status){
    refetch()
   }
  };
  const [addProduct,setAddProduct]=useState(false)
  const [addCategory,setAddCategory]=useState(false)
    const [searchText, setSearchText] = useState('');
    
    const handleSearch = (value) => {
      
        setSearchText(value);
      };
      const [filtered,setFiltered] = useState('');
    useEffect(()=>{
 console.log(products)
        const filteredData = products?.data?.filter((item) =>
          Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(searchText?.toLowerCase())
          )
        );
        setFiltered(filteredData)
    // console.log(filteredData)
    },[searchText,products])
    useEffect(()=>{
refetch()
    },[addProduct])


    const onPageChange = (page) => {
      setCurrentPage(page);
    };
  
    const pageSize = 5; // Number of items per page
    const totalItems = filtered?.length || 0;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
  
  
  return (
    <div className='p-2'>
      {!addProduct&&!addCategory&&<div>

      <div className="!flex items-center !justify-between">

    <Search
      placeholder="Search"
      style={{ width: 200, marginBottom: 16 }}
      onChange={(e) => handleSearch(e.target.value)}
      // Add any additional props you may need for the search input
    />
    <div>

    <Button  className={`${addCategory?"!bg-red-500 text-white":" "} mr-2`} onClick={()=>setAddCategory(!addCategory)}>{addCategory?"Cancel":"Add Category +"}</Button>

    <Button  className={`${addProduct?"!bg-red-500 text-white":"!bg-blue-500 text-white"}`} onClick={()=>setAddProduct(!addProduct)}>{addProduct?"Cancel":"Add Product +"}</Button>
    </div>
      </div>
    <Table
      columns={columns}
      dataSource={filtered?.slice(startIndex, endIndex)}
      pagination={false}
    />
    <Pagination
      current={currentPage}
      total={totalItems}
      pageSize={pageSize}
      showSizeChanger={false}
      showQuickJumper
      className='!ml-auto'
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      onChange={onPageChange}
      itemRender={(current, type, originalElement) => {
        if (type === 'page') {
          let showItem = false;
          if (currentPage <= 2) {
            showItem = current <= 3;
          } else if (currentPage >= Math.ceil(totalItems / pageSize) - 1) {
            showItem = current >= Math.ceil(totalItems / pageSize) - 2;
          } else {
            showItem = current >= currentPage - 1 && current <= currentPage + 1;
          }
          if (!showItem) {
            return null;
          }
        }
        return originalElement;
      }}
      style={{ marginTop: 16, textAlign: 'right' }}
    />
      </div>}
    {addProduct&&<>
      <div className='w-[70%]'>
      <ProductForm setclose={setAddProduct}/>

      </div>

    </>
    }
     {addCategory&&<>
      <div className='w-[70%]'>
      <CategoryForm setclose={setAddCategory}/>

      </div>

    </>
    }

<Modal
        title="Edit Product"
        visible={visible}
        onCancel={()=>setVisible(null)}
        footer={null}
      >
        <ProductForm initialValues={visible}  />
      </Modal>
  </div>
  );
};

export default AppointmentTable;
