import {useEffect, useState} from 'react'

import './App.css';
import {Table} from 'antd';

const columns=[
    {
      title:'Avatar',
      dataIndex:'avatar_url',
      render: theImageURL => <img alt={theImageURL} src={theImageURL} width={50}/>  // 'theImageURL' is the variable you must declare in order the render the URL
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
      dataIndex:''
    }
  ]

function App() {
  const [dataSource, setDataSource]=useState([])
  const [totalPages,setTotalPages]=useState(1)
  const [loading,setLoading]=useState(false)
  
  useEffect(()=>{fetchUsers()},[])

  const fetchUsers=()=>{
    setLoading(true)
    fetch('https://api.github.com/users').then((res)=>{res.json().then((response)=>{
      console.log(response)
      setDataSource(response)
      setTotalPages(response.length/10)
      setLoading(false)
    })})
  }  

  return (
    <div className="App">
     <Table 
     loading={loading}
     columns={columns}
     dataSource={dataSource}
     ></Table>
    </div>
  );
}

export default App;
