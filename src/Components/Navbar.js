import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'

function Navbar() {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className='logo'>
        <i className='fa-solid fa-comments'></i> ChatVerse
      </span>
      <div className='user'>
        <img src={currentUser.photoURL} alt='' />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>
          <i className='fa-solid fa-right-from-bracket'></i>
        </button>
      </div>
    </div>
  )
}

export default Navbar
