import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="global-background"></div>
      <Header />
      <main className="main-content">
        <div className="center-container">
          <Hero />
          <Projects />
        </div>
      </main>
      <About />
      <Contact />
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
