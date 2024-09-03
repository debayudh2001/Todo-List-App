import { useState, useEffect} from 'react';
import Navbar from './Navbar.jsx';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

function App() {
  
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])

  const handleAdd = () => {
    setTodos([...todos, {todo, isCompleted: false, id: uuidv4()}])
    setTodo("")
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let x = todos.filter(item => {
      return item.id === id
    })
    setTodo(x[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto my-5 p-5 rounded-xl bg-slate-400 min-h-[70vh] w-[80vw]'>

        <div className='addTodo'>
          <h1 className='font-bold text-lg text-center my-4'>iTask - Manage your Todos at one place</h1>
          <h2 className='font-bold text-lg mx-2 text-center lg:text-start'>Add a Todo</h2>
          <div className='flex my-3 w-[100%] justify-center lg:justify-start'>
            <input onChange={handleChange} value={todo} type='text' className='my-4 rounded-full w-1/3'></input>
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-slate-600 cursor-pointer hover:bg-slate-800 text-white font-bold rounded-xl mx-5 p-5 '><FaSave /></button>
          </div>
        </div>
        <input onChange={toggleFinished} type='checkbox' checked={showFinished}></input>&nbsp; Show Finished

        <h2 className='text-lg font-bold my-4'>Your Todos'</h2>

        <div className='todos'>
          {todos.length === 0 && <div className='m-5'>No Todos available.</div>} 
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex w-[100%] lg:w-1/3 justify-between my-3'>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckBox} type='checkbox' checked={item.isCompleted}></input>
                <div className={item.isCompleted ? 'line-through':''}>{item.todo}</div>
              </div>
              <div className='buttons flex h-full'>
                <button onClick={(e) => {handleEdit(e, item.id)}} className='bg-slate-600 cursor-pointer hover:bg-slate-800 text-white font-bold rounded-md mx-3 p-3 '><FaEdit /></button>
                <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-slate-600 cursor-pointer hover:bg-slate-800 text-white font-bold rounded-md mx-3 p-3 '><MdDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App;
