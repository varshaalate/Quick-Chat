import React from 'react'
import assets from '../assets/assets'
const Sidebar = ({ selectedUser, setSelectedUser }) => {
  return (
    <div className='pb-5'>
      <div className='flex justift-between items-centre'>
        <img src={assets.logo} alt="Logo" className='max-w-40' />
        <div className='relative py-2 group'>
          <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />
          <div>
            <p className='curson-pointer text-sm'>Edit Profile</p>
            <hr className='my-2 border-t border-gray-500' />
            <p className='curson-pointer text-sm'>LogOut</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
