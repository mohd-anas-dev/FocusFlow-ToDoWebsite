import React from 'react'
import "./Home.css"
import FlipLink from '@/components/ui/text-effect-flipper'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      
    <div className='Home'>
      <FlipLink>FocusFlow</FlipLink>
      <p>Plan. Track. Succeed.</p>
      <button onClick={() => navigate('/addtodo')}>Set To-Do</button>
    </div>

    </>
  )
}

export default Home
