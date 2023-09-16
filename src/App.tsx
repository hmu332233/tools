import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@nextui-org/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button color='primary'>Hello</Button>
    <h1 className="text-3xl font-bold underline">
    Hello world!
    </h1>
    </div>
  )
}

export default App
