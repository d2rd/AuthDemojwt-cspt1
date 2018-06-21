import React from 'react'
import { Link } from 'react-router-dom'
const Home = props => {
  const linkStyle = {
    margin: 10
  }
  const signOutClick = () => {
    localStorage.removeItem('token')
    // localStorage.somethingElse
    props.history.push('/login')
  }
  return (
    <div>
      <Link to='/' style={linkStyle}>Home</Link>
      <Link to='/register' style={linkStyle}>Register</Link>
      <Link to='/login' style={linkStyle}>Login</Link>
      <Link to='users' style={linkStyle}>Users</Link>
      <div onClick={signOutClick} style={linkStyle}>SignOut</div>
    </div>
  )
}

export default Home
