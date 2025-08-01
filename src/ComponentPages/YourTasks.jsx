import React from 'react'
import NavBar from './NavBar'
import "./YourTasks.css"
import { useState, useEffect } from 'react'

const YourTasks = () => {
  const [savedLists, setsavedLists] = useState({})  

  const AllowCheck=(listName, todoId)=>{
    const updatedLists = {...savedLists}
    const currentList = updatedLists[listName]
    const singleupdatedlist = currentList.map((todo) => todo.id === todoId ? {...todo, completed: !todo.completed} : todo)
    updatedLists[listName] = singleupdatedlist
    setsavedLists(updatedLists)
    localStorage.setItem('SavedTodoList', JSON.stringify(updatedLists))
  }

  const dateOfCreation = (listData) => {
    const getdate = Math.min(...listData.map((todo) => todo.id))
    const doc = new Date(getdate).toLocaleDateString()
    return doc
  }

  useEffect(() => {
    const savedTodoLists = localStorage.getItem('SavedTodoList')
    if(savedTodoLists){
      setsavedLists(JSON.parse(savedTodoLists))
    }
  }, [])

  const handleDeleteList = (listName) =>{
    const updatedLists = {...savedLists}
    delete updatedLists[listName]
    setsavedLists(updatedLists)
    localStorage.setItem('SavedTodoList', JSON.stringify(updatedLists))
  }
  
  return (
    <>
    <div className="YourTasks">
    <NavBar/>
        <h1>Manage Your To-Dos</h1>
      <div className="ToDoContainers">
        {Object.keys(savedLists).length===0?(
          <div className='NoLists'>
            <p>No Saved Todo lists found. Create One</p>
          </div>
        ) : (
          Object.entries(savedLists).map(([listName, listData]) => (
            <div key={listName} className='ToDoBox'>
              <h2>{listName}</h2>

              <div className='SavedListTodos'>
                {listData.map((todo)=>(
                  <div key={todo.id} className='ListToDos'>
                    <label>
                      <input type="checkbox"  checked={todo.completed} onChange={() => {AllowCheck(listName,todo.id)}}/>
                      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
                    </label>
                  </div>
                ))}
              </div>
              
              <div className='ToDoBoxFooter'>
                <footer>
                  <span>{dateOfCreation(listData)}</span>
                  <button onClick={()=>handleDeleteList(listName)}><svg className="Delete" xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/>
                    <path d="m12 9 6 6"/>
                    <path d="m18 9-6 6"/>
                  </svg></button>
                </footer>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  )
}

export default YourTasks
