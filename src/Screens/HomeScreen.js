import React from 'react'
import Chat from '../Components/Chat'
import Sidebar from '../Components/Sidebar'

function HomeScreen() {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default HomeScreen