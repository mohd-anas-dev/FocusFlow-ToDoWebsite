import './App.css'
import Home from './ComponentPages/Home'
import AddTodo from './ComponentPages/AddTodo'
import YourTasks from './ComponentPages/YourTasks'
import { Routes, Route, useLocation } from 'react-router-dom'
function App() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home/>}/>
      <Route path="/addtodo" element={<AddTodo/>}/>
      <Route path="/yourtask" element={<YourTasks/>}/>
        {/* <Route path='*' element={<NotFound/>}/> */}
    </Routes>
  )

}
export default App
