import React, { useState } from 'react'
import avatar from '../Images/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'

function RegisterScreen() {
  const [error, setError] = useState(false)
  const [wait, setWait] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    setWait(true)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'userChats', res.user.uid), {})
            setWait(false)
            navigate('/')
          } catch (error) {
            setWait(false)
            console.error(error)
            setError(true)
          }
        })
      })
    } catch (error) {
      setWait(false)
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
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input required type='text' placeholder='Name' />
          <input required type='email' placeholder='Email' />
          <input required type='password' placeholder='Password' />
          <input
            required
            single='true'
            style={{ display: 'none' }}
            type='file'
            id='avatar'
            accept='image/jpeg, image/png'
          />
          <label htmlFor='avatar'>
            <img src={avatar} alt='' />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
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
          You already an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterScreen
