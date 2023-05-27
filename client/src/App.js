import logo from './logo.svg';
import './App.css';
import { useApiCaller } from './helper';
import { useEffect, useState } from 'react';
import Table from './component/Table';

const API_URL = "http://127.0.0.8:4050/employee"

const colDef = [
  { label : "Name", name : "firstName", sortable : true},
  { label : "Position", name : "position", sortable : false},
  { label : "Office", name : "office", sortable : true},
  { label : "Age",name : "age", sortable : true},
  { label : "Start Date",name : "startDate", sortable : true},
  { label : "Salary",name : "salary", sortable : true, cellRenderer : (data,name) => <div key={data.id + name} className='cell'>$ {data.salary}</div>},
]
const compare = (strOne,strTwo) => strOne.toLowerCase().includes(strTwo.toLowerCase())
const filterCallback = (search) => (row) => {
    const { firstName , office , position ,startDate ,age , salary} = row;
    return compare(firstName,search) || compare(office,search) || compare(startDate,search) || compare(position,search) || compare(age + "",search) || compare(salary + "",search);
}
function App() {
  const [entries,setEntries] = useState(10);
  const [page,setPage] = useState(1);
  const [search,setSearch] = useState("");
  const [response,fetch,setResponse] = useApiCaller();
  useEffect(() => {
    fetch(`${API_URL}?page=${page}&entries=${entries}`);
  },[entries,page])
  return (
    <div className="App">
      <div className='input-container'>
        <div>
          <label>Show</label>
          <input 
          onChange={({target : { value }}) => (Number(value) === entries + 1 || Number(value) === entries - 1) && Number(value) > 4 &&  setEntries(Number(value))}
          type="number"
           min={5} value={entries}/>
          <label>Entries</label>
        </div>
        <div>
          <input 
          className='search-input'
          onChange={({target : {value}}) => setSearch(value)}
          placeholder='Search'/>
        </div>
      </div>
      {
        response && <>
        <div className='table-container'>
         <Table
        rowData={search ? response.data.filter(filterCallback(search)) : response.data}
        onSort={(rowdata) => setResponse(prev => ({...prev,data : rowdata}))}
        colDef={colDef}/>
      </div>
      <div>
        <div>
          {
            search === '' && <p>Showing {(page - 1) * entries + 1} to {((page - 1) * entries ) + response.data.length} in {response.totalEmployee}</p>
          }
        </div>
        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <button>{page}</button>
          <button onClick={() => setPage(page + 1)} disabled={page === response.totalPages}>Next</button>
        </div>
      </div>
      </>
      }
    </div>
  );
}

export default App;
