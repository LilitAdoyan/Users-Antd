import {useEffect, useState} from 'react'
import {Table, Button, Input} from 'antd';
import './App.css';


function App() {
  const [searchedText, setSearchedText]=useState('')
  const [dataSource, setDataSource]=useState([])
  const [loading,setLoading]=useState(false)
  const [expandedRows, setExpandedRows] = useState([])

  const userColumns=[
    { 
      title:'Name',
      dataIndex:'name',
     
    },
    { 
      title:'Company',
      dataIndex:'company'
    },
    { 
      title:'Location',
      dataIndex:'location'
    },
    {
      title:'Repositories',
      dataIndex:'public_repos',
    },
    { 
      title:'Followers',
      dataIndex:'followers',
    },
  ]
   
  
  const columns=[
    { 
      title:'Avatar',
      dataIndex:'avatar_url',
      render: theImageURL => <img alt={theImageURL} src={theImageURL} width={50}/>  // 
    },
    { 
      title:'Username',
      dataIndex:'login',
      filteredValue:[searchedText],
      onFilter: (value, record)=>{
        console.log(record)
        return String(record.name).toLowerCase().includes(value.toLowerCase())
      }
    },
    { 
      title:'Type',
      dataIndex:'type'
    },
    { 
      title:'Options',
      dataIndex:'',
      render: (_, record) => (
        <Button onClick={()=>{ 
          const allKeys = dataSource.map((record) => record.id )
          setExpandedRows(allKeys)

          }} >
          {"Show more"}
        </Button>
       ),
    },
    
  ]



const token = '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';


const fetchUsers=async()=>{
  setLoading(true)
  
 await fetch('https://api.github.com/users', {
    headers: {
      Authorization: `token ${token}`
    }
  }).then((res)=>{res.json().then((response)=>{
      setLoading(false)
      const modified=[]
      
    for (let i=0; i<response.length; i++){
    const c = async () => await fetch(`https://api.github.com/users/${response[i].login}`, {
      headers: {
        Authorization: `token ${token}`
      }
    }).then((res)=>{res.json().then((response)=>{
      setLoading(false)
      modified.push({...response, key:response.id})
      setDataSource(modified)
    })})
        c()
      }
  })})} 

useEffect(()=>{

fetchUsers()
  
  },[])  



  return (
    <div className="App">
      <Input.Search placeholder='Search here..' 
      onSearch={(value)=>setSearchedText(value)}/>
     <Table 
     loading={loading}
     columns={columns}
     dataSource={dataSource}
     expandable={{
      expandedRowKeys:expandedRows,
      expandIcon:null,
      defaultExpandAllRows:false,
      expandedRowRender:(record)=>{
    return (<Table 
      columns={userColumns}
      dataSource={record}//if you comment this row you will see the expanded empty table with tho column names
      key={expandedRows}
      rowKey={record.id}
      />)
      },

     }}
     >
    
     </Table>
    </div>
  );
}

export default App;
