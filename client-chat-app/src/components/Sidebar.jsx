import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className="pb-5 flex flex-col">

        {/* Logo and menu */}
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="Logo" className="w-40" />
          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="Menu" className="max-h-5 cursor-pointer" />
            <div className="absolute top-full right-0  z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p onClick={() => navigate('/profile')} className="cursor-pointer text-sm">Edit Profile</p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm">LogOut</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-6 mb-4'>
          <img src={assets.search_icon} alt="search" className='w-4 h-4' />
          <input 
            type="text" 
            className='bg-transparent border-none outline-none text-white text-sm placeholder-[#c8c8c8] flex-1' 
            placeholder='Search User...' 
          />
        </div>

        {/* Users List */}
        <div className='flex flex-col'>
          {userDummyData.map((user, index) => (
            <div 
              onClick={() => setSelectedUser(user)} 
              key={index} 
              className={`relative flex items-center gap-3 p-2 pl-4 rounded cursor-pointer
              ${selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''}`}
            >
              <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-square rounded-full' />
              <div className='flex flex-col leading-5'>
                <p className='text-sm'>{user.fullName}</p>
                <span className={`text-sm ${index < 3 ? 'text-green-400' : 'text-gray-400'}`}>
                  {index < 3 ? 'Online' : 'Offline'}
                </span>
              </div>
              {index > 3 && (
                <p className='absolute top-2 right-2 text-sm h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                  {index}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Sidebar
