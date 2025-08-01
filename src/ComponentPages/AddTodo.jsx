import NavBar from './NavBar'
import WatchClock from './WatchClock'
import "./AddTodo.css"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HandCoins, User } from 'lucide-react'

const AddTodo = () => {
    const navigate = useNavigate()
    
    const [UserToDos, setUserToDos] = useState([])
    const [UserValues, setUserValues] = useState("")

    const [editingId, seteditingId] = useState(null)
    const [editingText, seteditingText] = useState("")

    const [showSaveDialog, setshowSaveDialog] = useState(false)
    const [inputListChange, setinputListChange] = useState("")
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [savedListName, setSavedListName] = useState("")
    const [saveError, setSaveError] = useState("")

    const [ShowFinishedTodos, setShowFinishedTodos] = useState(false)


    const handleFinishedTodos = () => {
        if(ShowFinishedTodos){
            const fData = UserToDos.filter(todo => todo.completed === true)
            return fData
        } else {
            return UserToDos
        }
    }

    const handleCompleteToggler = (id) => {
        const updatedTodos = UserToDos.map((todo) =>
        todo.id === id ? {...todo, completed:!todo.completed} : todo
        )
        setUserToDos(updatedTodos)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }


    const handleStartEdit = (id, currentText) =>{
        seteditingId(id),
        seteditingText(currentText)
    }

    const handleSaveEdit = () => {
        const updatedTodos = UserToDos.map((todo)=> todo.id === editingId? {...todo, text:editingText}: todo)
        setUserToDos(updatedTodos)
        localStorage.setItem('todos',JSON.stringify(updatedTodos))
        seteditingId(null)
        seteditingText("")
    }

    const handleCancelEdit = () =>{
        seteditingId(null)
        seteditingText("")
    }

    const handleEditInputChange = (e) =>{
        seteditingText(e.target.value)
    }

    useEffect(() => {
      const savedTodos = localStorage.getItem('todos')
      if(savedTodos){
        setUserToDos(JSON.parse(savedTodos))
      }
    

    }, [])
    

    const handleInputChange=(e)=>{
        const Data = e.target.value 
        setUserValues(Data)
    }
 
    const handleClickEvent =() =>{
        if(UserValues.trim() != ""){
            const newTodo = {
                id: Date.now(),
                text: UserValues,
                completed:false
            }
            setUserToDos([...UserToDos,newTodo])
            localStorage.setItem('todos',JSON.stringify([...UserToDos,newTodo]))
            setUserValues("")
        }
    }

    const handleDeleteTodos =(id) => {
        const UpdatedTodos = UserToDos.filter((todo) => todo.id !== id)
        setUserToDos(UpdatedTodos)
        localStorage.setItem('todos',JSON.stringify(UpdatedTodos))
    }


    const handleShowSaveDialog=()=>{
        setshowSaveDialog(true)
    }

    const handleCancelSaveDialog=()=>{
        setshowSaveDialog(false)
        setinputListChange("")
        setSaveSuccess(false)
        setSavedListName("")
        setSaveError("")
    }

    const handleInputSaveChange=(e)=>{
        setinputListChange(e.target.value)
    }

    const handleSaveList = () =>{
        if(inputListChange.trim() === ""){
            setSaveError("Please Enter a list name !")
            return
        }

        const existingSavedLists = localStorage.getItem('SavedTodoList')
        const savedLists = existingSavedLists ? JSON.parse(existingSavedLists) : {}

        savedLists[inputListChange] = UserToDos
        localStorage.setItem('SavedTodoList',JSON.stringify(savedLists))

        setSaveSuccess(true)
        setSavedListName(inputListChange)
        setSaveError("")
        
        setUserToDos([])
        localStorage.removeItem('todos')
        setinputListChange("")
    }

    const handleGoToTasks = () => {
        navigate('/yourtask')
        setshowSaveDialog(false)
        setSaveSuccess(false)
        setSavedListName("")
        setSaveError("")
    }

    const handleCloseSuccess = () => {
        setshowSaveDialog(false)
        setSaveSuccess(false)
        setSavedListName("")
        setSaveError("")
    }

    useEffect(() => {
        if (saveSuccess) {
            const timer = setTimeout(() => {
                handleCloseSuccess()
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [saveSuccess])




    
  return (
    <>
    <div className="Todo">
        <NavBar/>
        <div className="TodoContainer">
            <div className="TodoEntire">
                <div className="TodoDialogPart1">
                    <h2>FocusFlow – Your Personal To-Do Hub</h2>
                        <h4>Add a To-Do</h4>
                    <div className="AddTodo">
                        <input type="text" value={UserValues} onChange={handleInputChange} placeholder='e.g., Finish math homework' /> 
                        <button onClick={handleClickEvent}>Add</button>
                    </div>
                </div>

 

                <div className="TodoDialogPart2">
                    <h2>Your To-Do</h2>
                    <label>
                        <input type="checkbox" name="Finished" value="yes" checked={ShowFinishedTodos} onChange={(e)=>{setShowFinishedTodos(e.target.checked)}}/>Completed To-Do
                    </label>
                </div>
                    
                <div className="UserTodos">
                    {handleFinishedTodos().map((todo)=>(
                        
                        <div key={todo.id} className="YourToDo" >
                            {
                                editingId === todo.id ? (
                                    <input
                                    type="text"
                                    value={editingText}
                                    onChange={handleEditInputChange}
                                    className='EditInput'
                                    placeholder='Edit.....'
                                    />
                                    ) : (
                                        <label>
                                        <input type="checkbox" checked={todo.completed} onChange={() => handleCompleteToggler(todo.id)} />
                                        <span className= {todo.completed ? "completed" : ""}>{todo.text}</span>
                                    </label>
                                )
                            }

                        <div className="Buttons">

                            {
                                editingId === todo.id ? (
                                    <>
                                        <button onClick={handleSaveEdit}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="SaveEdit"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></button>
                                        <button onClick={handleCancelEdit}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="CancelEdit"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={()=> handleStartEdit(todo.id, todo.text)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="Edit"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></button>
                                        <button onClick={()=> handleDeleteTodos(todo.id)}><svg class="Delete" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg></button>
                                    </>
                                )
                            }

                        </div>
                    </div>))}
                </div>

                <div className="SaveTodo">
                    <button onClick={handleShowSaveDialog}>Save<svg class="Save" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg></button>
                </div>
            </div>
            <WatchClock/>
        </div>

        {showSaveDialog && (
            
            <div className='SaveMainDialog'>
                {!saveSuccess ? (
                    <>
                        <div className='DialogContent'>
                            <h1>Save To-Do</h1>
                            <p>Name your To-Do list</p>
                            <input
                                value={inputListChange}
                                type="text"
                                onChange={handleInputSaveChange}
                                placeholder='e.g., Work Tasks, Academic Tasks'
                                />
                            {saveError && <p className="SaveError">{saveError}</p>}
                        </div>

                        <div className='SaveButtons'>
                            <button onClick={handleSaveList}>Save<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="SaveList"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg></button>
                            <button onClick={handleCancelSaveDialog}>Cancel<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="CancelSave"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button>
                        </div>
                    </>
                ) : (
                    <div className="SuccessDialog">
                        <div className='DialogContent'>
                            <h1 className="SuccessTitle">"{savedListName}" SAVED! ✅</h1>
                            <p className="SuccessMessage">Visit Your To-Do to view your saved list</p>
                        </div>

                        <div className='SuccessButtons'>
                            <button onClick={handleGoToTasks} className="GoToTasksBtn">
                                Go to Your Tasks
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                            </button>
                            <button onClick={handleCloseSuccess} className="CloseBtn">Close</button>
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
    </>
  )
}

export default AddTodo
