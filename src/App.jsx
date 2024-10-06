import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)
  const [showFinished, setShowFinished] = useState(false)

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (id) => {
    const t = todos.find(i => i.id === id)
    setTodo(t.todo)
    setEditId(id) // Set the ID of the todo we're editing
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
    if (todo.trim().length === 0) return

    if (editId) {
      // Update the existing todo in place
      const updatedTodos = todos.map(item => {
        if (item.id === editId) {
          return { ...item, todo }
        }
        return item
      })
      setTodos(updatedTodos)
      saveToLS(updatedTodos)
      setEditId(null) // Reset the edit state
    } else {
      // Add a new todo
      const newTodos = [...todos, { id: uuidv4(), todo, iscompleted: false }]
      setTodos(newTodos)
      saveToLS(newTodos)
    }
    
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    const id = e.target.name
    const index = todos.findIndex(item => item.id === id)
    const newTodos = [...todos]
    newTodos[index].iscompleted = !newTodos[index].iscompleted
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  // Function to handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  return (
    <>
      <Navbar />
      <div className="container bg-purple-200 mx-auto my-10 rounded-xl p-5 w-[85vw] md:w-[70vw] lg:w-[70vw] min-h-[80vh] mt-24">
        <div className="addTodo my-4 sp">
          <h2 className='text-xl font-bold'>{editId ? 'Edit Todo' : 'Add a Todo'}</h2>
          <div className='flex items-center'>
            <input 
              onChange={handleChange} 
              onKeyPress={handleKeyPress} // Listen for Enter key
              value={todo} 
              className='w-[60vw] md:w-[50vw] p-1 rounded-sm text-lg h-[40px] my-5' 
              type="text" 
            />
            <button 
              onClick={handleAdd} 
              disabled={todo.length < 1} 
              className='bg-purple-600 text-white hover:bg-purple-800 p-1 m-1 rounded-md ml-3 w-16 h-[38px] font-bold hover:scale-105 cursor-pointer'>
              {editId ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='size-4 mt-[5px]' /> Show Finished Todos
        <div className='h-[1px] bg-black opacity-20 my-2'></div>
        <h2 className='text-xl font-bold my-4'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => (
            (showFinished || !item.iscompleted) && (
              <div key={item.id} className="todo flex items-center justify-between w-4/5 lg:w-3/4 my-3">
                <div className='flex gap-5'>
                  <input onChange={handleCheckbox} className='size-4 mt-[5px] ml-2 md:ml-4' type="checkbox" checked={item.iscompleted} name={item.id} />
                  <div className='w-[33vw]'>
                    <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                </div>
                <div className="buttons flex">
                  <button onClick={() => handleEdit(item.id)} className='bg-purple-600 text-white hover:bg-purple-800 p-2 rounded-md mb-1 ml-3 h-8 font-bold hover:scale-105'><FaEdit /></button>
                  <button onClick={() => handleDelete(item.id)} className='bg-purple-600 text-white hover:bg-purple-800 p-2 rounded-md mb-1 ml-3 h-8 font-bold hover:scale-105 text-sm'><AiFillDelete /></button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}

export default App
