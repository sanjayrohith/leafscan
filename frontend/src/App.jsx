import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'

/**
 * Root application component.
 * Sets up routing and renders the shared Navbar above all pages.
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-leaf-400/60 text-sm border-t border-white/5">
        <p>© 2026 LeafScan · AI-powered plant health diagnostics</p>
      </footer>
    </div>
  )
}
