import React, { useEffect, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'
import axios from 'axios'

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/todos')
    .then((response) => {
      setTodos(response.data)
    },)
  },[])

  const add = () => {
    axios.post('http://127.0.0.1:8000/todos', {task:description})
    .then((response) => {
      setTodos([...todos, response.data])
      setDescription("")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function update(id) {
    axios.patch(`http://127.0.0.1:8000/todos/${id}`)
    .then((response) => {
      console.log(response.data)
      const new_todo = todos.map((item) => {
        if (item.id == response.data.id) {
          console.log(response.data)
          return response.data
        } else{
          return item
        }
      })
      setTodos(new_todo)
    })
  }

  function remove(id) {
    axios.delete(`http://127.0.0.1:8000/todos/${id}`)
    .then((response) => {
      if(response.status == 204) {
        setTodos((current) => current.filter((item) => item.id !== id))
      }
    })
  }

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
    {/* -----title----- */}
    
        <div className='flex items-center mt-7 gap-2'>
          <img className='w-8' src={todo_icon} alt="" />
          <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>
    {/* -----input box----- */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Add your task' className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' />
          <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>
            ADD +</button>
        </div>
        <div>
        {todos.map((todo)=>{
          return (            
          <div key={todo.id} className='flex items-center my- gap-2'>
                <div  className='flex flex-1 items-center cursor-pointer'>
                    <img src={todo.isComplete ? tick : not_tick} onClick={() =>{update(todo.id)}} alt="" className='w-6' />
                    <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 `}>{todo.task}</p>
                </div>
        
                <img  src={delete_icon} onClick={() =>{remove(todo.id)}} alt="" className='w-3.5 cursor-pointer'/>
            </div>
          )
        })}
        </div>
      </div>
  )
}

export default Todo