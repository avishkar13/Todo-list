import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-purple-500 text-white py-3 fixed top-0 w-full ">
        <div className="logo">
            <span className=" font-bold text-xl mx-10">iTask</span>
        </div>
     <ul className="flex gap-5 mx-3 md:mx-11 ">
        <li className=" cursor-pointer font-medium hover:font-bold transition-all ">Home</li>
        <li className=" cursor-pointer font-medium hover:font-bold transition-all  ">Your Tasks</li>
     </ul>
    </nav>
  )
}

export default Navbar
