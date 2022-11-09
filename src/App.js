import {useEffect, useState} from 'react'
import {Table, Button, Input} from 'antd';
import './App.css';


function App() {
  const [userDataSource, setUserDataSource]=useState([])
  const [searchedText, setSearchedText]=useState('')
  const [dataSource, setDataSource]=useState([])
  const [loading,setLoading]=useState(false)

  const userColumns=[
    {
      title:'Name',
      dataIndex:'name',
      filteredValue:[searchedText],
      onFilter: (value, record)=>{
        return record.name.toLowerCase().includes(value.toLowerCase())
      }
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
      dataIndex:'login'
    },
    { 
      title:'Type',
      dataIndex:'type'
    },
    { 
      title:'Options',
      dataIndex:'',
      render: (_, record) => (
        <Button onClick={()=>{ fetchUser(record)}} >
          {"Show more"}
        </Button>
       ),
    },
    
  ]



 function fetchUser (record) {      
  fetch(`https://api.github.com/users/${record.login}`).then((res)=>{res.json().then((response)=>{
    setUserDataSource(response)
  })})
} 

const fetchUsers=()=>{
    setLoading(true)
    fetch('https://api.github.com/users').then((res)=>{res.json().then((response)=>{
      setDataSource(response)
      setLoading(false)
    })})
  }  

useEffect(()=>{fetchUsers()},[])  

  return (
    <div className="App">
      <Input.Search placeholder='Search here..' 
      onSearch={(value)=>setSearchedText(value)}/>
     <Table 
     loading={loading}
     columns={columns}
     dataSource={dataSource}
     >
       <Table 
      columns={userColumns}
      dataSource={userDataSource}
      />
     </Table>
    </div>
  );
}

export default App;
