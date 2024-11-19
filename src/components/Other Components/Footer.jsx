import React from 'react'
import logo from '../../assets/2.png'

const Footer = () => {
  return (
    <footer className="footer footer-center bg-black text-base-content p-4">
        <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by</p>
        <a href='https://www.instagram.com/bros_c0de/' target="_blank" rel="noopener noreferrer"><img className='h-[50px]' src={logo}></img></a>
        </aside>
    </footer>
  )
}

export default Footer