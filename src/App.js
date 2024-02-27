import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setIsNumberAllowed] = useState(false);
  const [charAllowed, setIsCharAllowed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [password, setPassword] = useState('')
  const passRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += `~!@#$%^&*()_+`
    console.log(str.length)

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  useEffect(() => { generatePassword() }
    , [length, numberAllowed, charAllowed])

  const copyPass = () => {
    // passRef.setSelectionRange(0, 99999);`
    passRef.current.select()
    navigator.clipboard.writeText(`${password}`)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }


  return (
    <main>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="input-box">
          <input type="text" style={{ color: "#112D4E" }} ref={passRef} value={password} readOnly />
          <button className="copy-btn" onClick={copyPass}>{isCopied ? "Copied!" : "copy"}</button>
        </div>
        <div>
          <div style={{ marginTop: "5px" }}>
            <input type="range" style={{ width: "100%" }} className="range-bar" id="range" value={length} onChange={(e) => setLength(e.target.value)} min={5} max={20} />
            <label htmlFor="range" style={{ display: "block" }}>Length: {length}</label>
          </div>
          <div style={{ marginTop: "5px" }}>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setIsNumberAllowed(!numberAllowed)}
              id="numbers" />
            <label htmlFor="numbers">Includes Numbers</label>
          </div>
          <div style={{ marginTop: "5px" }}>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setIsCharAllowed(!charAllowed)}
              id="characters" />
            <label htmlFor="characters">Includes Characters</label>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App