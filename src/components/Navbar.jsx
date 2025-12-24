import React from 'react'

function Navbar() {
  return (
    <>
        <nav className="w-full h-full px-5 py-2.5 border-b border-[#3A3A3A] shadow-sm flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#3A3A3A]">Hi, Person</h1>
            <button className="px-4 py-2 bg-[#272727] text-[#FBFBFB] text-xl rounded-xl cursor-pointer hover:brightness-110 transition-all duration-150 ease-in-out">
                Generate Insights
            </button>
        </nav>
    </>
  )
}

export default Navbar