import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

function LoginScreen() {
  const [error, setError] = useState(false)
  const [wait, setWait] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    setWait(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      setError(true)
      console.error(error)
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>
          <i className='fa-solid fa-comments'></i> ChatVerse
        </span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input required type='email' placeholder='Email' />
          <input required type='password' placeholder='Password' />
          <button>Sign In</button>
          {wait && (
            <span
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#5d5b8d',
                padding: '0.5rem',
                borderRadius: '0.5rem',
              }}
            >
              Please wait! <i className='fa-solid fa-spinner spinner'></i>
            </span>
          )}
          {error && (
            <span
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: 'red',
                padding: '0.5rem',
                borderRadius: '0.5rem',
              }}
            >
              Something went wrong!
            </span>
          )}
        </form>
        <p>
          You don't have account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginScreen
