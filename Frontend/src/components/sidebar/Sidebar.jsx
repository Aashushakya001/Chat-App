import React from 'react'
import { SearchInput } from './SearchInput'
// import { Conversation } from './conversation'
import { Conversations } from './Conversations.jsx'
import { Logout } from './Logout.jsx'

export const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'> 
        <SearchInput/>
        <div>
          
        </div>
        <div className='divider px-3'></div>
        <Conversations/>
        <Logout/>
        {/* <Conversations/> */}
        {/* <LogoutButton/> */}
    </div>
  )
}
