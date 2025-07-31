import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-gray-800 text-white text-center text-sm">
        <div className="max-w-7xl mx-auto">
          &copy; {new Date().getFullYear()} HireHub. All rights reserved. | <a href="#" className="hover:underline text-blue-300">Privacy Policy</a>
        </div>
      </footer>
  )
}

export default Footer