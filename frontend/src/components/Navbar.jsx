import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

/**
 * Responsive navigation bar with app branding and page links.
 * Features a mobile hamburger menu with smooth transitions.
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClasses = ({ isActive }) =>
    `relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-leaf-300 bg-white/10'
        : 'text-leaf-100/70 hover:text-leaf-200 hover:bg-white/5'
    }`

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Leaf SVG inline for instant render */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-leaf-400 to-leaf-600 flex items-center justify-center shadow-lg shadow-leaf-500/20 group-hover:shadow-leaf-500/40 transition-shadow duration-300">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-leaf-300 to-leaf-500 bg-clip-text text-transparent">
              LeafScan
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={linkClasses} id="nav-home">
              Home
            </NavLink>
            <NavLink to="/about" className={linkClasses} id="nav-about">
              About
            </NavLink>
          </div>

          {/* Mobile hamburger button */}
          <button
            id="mobile-menu-button"
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6 text-leaf-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav (slide-down) */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-40 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            <NavLink to="/" end className={linkClasses} onClick={() => setMobileOpen(false)} id="mobile-nav-home">
              Home
            </NavLink>
            <NavLink to="/about" className={linkClasses} onClick={() => setMobileOpen(false)} id="mobile-nav-about">
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
