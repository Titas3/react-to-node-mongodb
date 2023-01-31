// import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
function App() {
   const [form, setForm] = useState({});
   const [users, setUsers] = useState([]);

  const HandleForm = (e) =>{
    
    console.log(e.target.value,e.target.name);
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
  const response = await fetch('http://localhost:8080/demo',{
      method:'POST',
      body:JSON.stringify(form),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
 console.log(data);
  }

  const getUser = async()=>{
    const response = await fetch('http://localhost:8080/demo',{
      method:'GET',
      // body:JSON.stringify(form),
      // headers:{
      //   'Content-Type': 'application/json'
      // }
    })
    const data = await response.json();
 console.log(data);
 setUsers(data);
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
      {/* <p>{JSON.stringify(form)}</p> */}
      <br/>
      <span>User Name</span>
        <input type="text" name="username" onChange={HandleForm} />
        <span>Password</span>
        <input type="text" name="password" onChange={HandleForm} />
        <input type="submit" />
      </form>
      <div>
        <ul>
          {users.map(user=><li key={user._id}>{user.username},{user.password}</li>)}
        </ul>
      </div>
    </div>
  );
}
 
export default App;
