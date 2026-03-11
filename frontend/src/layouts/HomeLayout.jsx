import React from 'react'
import ProfilePage from '../pages/ProfilePage'
import Logout from '../pages/Logout'

const HomeLayout = () => {
  return (
    <div className='    p-2'>
     <div>
       <ProfilePage/>
       <Logout/>
     </div>
  
   
  
    </div>
  )
}

export default HomeLayout