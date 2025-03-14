import { useCallback, useState, useEffect, useRef} from 'react'
import React from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+={}[]~`"


     for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
     }
     setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword] )


const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
 // passwordRef.current?.setSelectionRange(0, 3);
  window.navigator.clipboard.writeText(password)


}, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3 font-bold'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden bg-white  mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 font-bold'>Copy</button>
      </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
             type="range"
             min={6}
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e) => {setLength(e.target.value)}}
             />
             <label className='text-orange-500 font-semibold'>Length : {length}</label>
          </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={(e) => {
                setNumberAllowed((prev) => !prev)
              }}
               />
               <label htmlFor="numberInput" className='font-semibold '>Number</label>
            </div>
            <div className='flex text-center gap-x-1'>
              <input type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
              />
              <label htmlFor="characterInput" className='font-semibold'>Characters</label>
            </div>
        </div>

     </div>
    </>
  )
}

export default App
