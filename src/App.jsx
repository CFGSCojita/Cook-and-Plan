import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <header>
        <h1>Cook&Plan</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer>© 2025 Cook&Plan</footer>
    </div>
  )
}

export default App