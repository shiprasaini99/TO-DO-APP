import React, {useState, useEffect} from 'react';
import './App.css';
import{Button,FormControl, Input,InputLabel} from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input,setInput]= useState('');
  
//when the app loads we need to listen the database and fetch new todos as they get added/removed

useEffect(()=>{
//this code here....fires when the app.js oads
db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
  //console.log(snapshot.docs.map(doc=> doc.data()));//retuns as an array of objects
  setTodos(snapshot.docs.map(doc=> ({id: doc.id, todo: doc.data().todo})))   //from database
})


},[]);




  const addTodo=(event) =>{
    // this will fireoff when we click on button
    event.preventDefault();
   db.collection('todos').add({
     todo: input,
     timestamp:firebase.firestore.FieldValue.serverTimestamp() //firebase server where the app is hosted
   })
    setTodos([...todos,input]);
    setInput('');//CLEAR UP THe input after clicking add todo button
    
  }
  return (
    <div className="App">
      <h1> Hello, Enter your To-do's for today👩‍💻! </h1>
      <form>
     
      
      <FormControl>
          <InputLabel >✅Write a TODO</InputLabel>
          <Input value={input}  onChange={event=>setInput(event.target.value)}/>
      </FormControl>
      
      
      
      
      <Button disabled={!input} type='submit' onClick={addTodo} variant="contained" color="primary">ADD Todo
      
       </Button>
      {/*<button type='submit' onClick={addTodo}>App Todo </button>*/}

      </form>
      
      <ul>  
        {todos.map(todo=>(
          <Todo todo={todo}/>
          //<li>{todo}</li>
        ))}
 
      </ul>
    </div>
  );
}

export default App;
