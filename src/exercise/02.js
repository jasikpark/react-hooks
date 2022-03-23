// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorage(
  key,
  initialState = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const prevKey = React.useRef(key)

  const [item, setItem] = React.useState(() => {
    const itemInLocalStorage = window.localStorage.getItem(key)
    if (itemInLocalStorage) {
      return deserialize(itemInLocalStorage)
    }
    return typeof initialState === 'function' ? initialState() : initialState
  })

  React.useEffect(() => {
    if (prevKey.current !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKey.current = key
    window.localStorage.setItem(key, serialize(item))
  }, [key, item, serialize])

  return [item, setItem]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  const [name, setName] = useLocalStorage('name', initialName)
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
