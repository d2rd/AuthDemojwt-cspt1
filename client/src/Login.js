import React, {Component} from 'react'
import axios from 'axios'

export default class Login extends Component {
  state = {
    username:'',
    password:'',
    token:''
  }
  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  submitHandler = (e) => {
    const { username, password } = this.state
    e.preventDefault()
    axios.put('http://localhost:5000/api/login', { username, password })
      .then(response =>{
        localStorage.setItem('token', response.data.token)
        this.props.history.push('/')
    })
    .catch( err => console.log(err))
  }
  render() {
    return (
      <div style={{marginTop: 20}}>
        <div>
        Login
        </div>
        <form onSubmit={this.submitHandler}>
          <input name='username' placeholder='Username' value={this.state.username} onChange={this.inputChange} />
          <input name='password' type='password' placeholder='Password' value={this.state.password} onChange={this.inputChange} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}