import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './style.css'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <Outlet />
    </div>
  )
}

export default App