import { uuidv4 } from '@firebase/util'
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase'

function Input() {
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    try {
      if (image) {
        const storageRef = ref(storage, uuidv4())
        const uploadTask = uploadBytesResumable(storageRef, image)
        const snapshot = await uploadTask
        // console.log(snapshot)
        const downloadURL = await getDownloadURL(snapshot.ref)
        // console.log(downloadURL)
        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            image: downloadURL,
          }),
        })
      } else {
        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        })
      }

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      })

      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      })

      setText('')
      setImage(null)
    } catch (error) {
      // TODO: handle error
      console.log(error)
    }
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSend()
  }

  return (
    <div className='input'>
      <input
        type='text'
        placeholder='Type a message'
        onKeyDown={handleKey}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className='send'>
        <input
          type='file'
          style={{ display: 'none' }}
          id='img'
          accept='image/jpeg, image/png'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor='img'>
          <i className='fa-solid fa-paperclip'></i>
        </label>
        <button onClick={handleSend}>
          {/* {loading ? ( */}
          {/* <i className='fa-solid fa-spinner spinner'></i> */}
          {/* ) : ( */}
          <i className='fa-regular fa-paper-plane'></i>
          {/* )} */}
        </button>
      </div>
    </div>
  )
}

export default Input
