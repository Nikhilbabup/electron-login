// import React from 'react'

import { useState } from 'react'

const LoginComponent = (): JSX.Element => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = (): void => {
    window.electron.ipcRenderer.send('user-login', username, password)
    console.log('Logging in with', { username, password })
  }
  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <div>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handleClick}>
            LOGIN
          </button>
          <p>
            Not registered? <a href="#">Create an account</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginComponent
