import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"
const NavBar = () => {
    const [ForMobile, setForMobile] = useState(false)
  return (
    <>

        <div className="ForMobile">
            {!ForMobile ? (
                <>
                <button onClick={()=>{setForMobile(true)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="Hamburger"><path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/></svg></button>
                </>
                
            ) : (
                <>
                <button onClick={()=>{setForMobile(false)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="CrossHamburger"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                </>
                
            )
        }
        </div>
        <div className={`TodoNav ${ForMobile ? 'mobile-open' : 'mobile-closed'}`}>
            <div className="NavLeft">
                <img src="https://i.postimg.cc/j2t7fpfC/Logo.png" alt="logo" />
                <h1>FocusFlow</h1>
            </div>
            <div className="NavRight">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive}) => isActive ? "Underline active" : "Underline"}>
                           Home
                        </NavLink>

                    </li>

                    <li>
                        <NavLink to="/addtodo" className={({ isActive }) => isActive ? "Underline active" : "Underline"}>
                            Add To-Do
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/yourtask" className={({ isActive }) => isActive? "Underline active": "Underline"}>
                            Your To-Do
                        </NavLink>
                    </li>
                </ul>
            </div>
         </div>   
    </>
  )
}

export default NavBar
