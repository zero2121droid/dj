import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/2.png'
import { CONTACT } from '../../data/site'

const Footer = () => {
  return (
    <footer className="border-t border-white/15 px-4 md:px-8 pt-12 pb-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/booking" className="group block font-display uppercase leading-[.88] text-[clamp(3rem,11vw,8rem)] mb-8">
          Booking
          <span className="block text-outline group-hover:[-webkit-text-stroke-color:#bd2025] transition-all">
            &amp; kontakt →
          </span>
        </Link>
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm font-bold">
          <a href={`mailto:${CONTACT.email}`} className="hover:text-brand">
            <span className="block text-xs font-normal uppercase tracking-wider text-brand">Email</span>
            {CONTACT.email}
          </a>
          <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
            <span className="block text-xs font-normal uppercase tracking-wider text-brand">Instagram</span>
            @{CONTACT.instagram}
          </a>
          <a href={`https://tiktok.com/@${CONTACT.tiktok}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
            <span className="block text-xs font-normal uppercase tracking-wider text-brand">TikTok</span>
            @{CONTACT.tiktok}
          </a>
          <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
            <span className="block text-xs font-normal uppercase tracking-wider text-brand">YouTube</span>
            @JorgacevicDJ
          </a>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Dejan Jorgaćević · Sva prava zadržana</p>
          <a href='https://www.instagram.com/bros_c0de/' target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            Izrada <img className='h-8' src={logo} alt="bros_c0de"></img>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
