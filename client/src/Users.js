import React, {Component} from 'react';
import axios from 'axios';

export default class Users extends Component {
  state = {
    users: []
  }
  componentDidMount(){
  const token = localStorage.getItem('token')
  console.log(token)
    axios.get('http://localost:5000/api/users', {headers: {'Authorization': token }})
      .then( response => {
        console.log(response)
      })
      .catch( err => {
        console.log(err)
      })
  }
  render(){
    return (
      <div>
        <div>
          Users
        </div>
        <ul>
          {this.state.users.map( user => {
            return <li key={user._id}>{user.username}</li>
        })}
        </ul>
      </div>
    )
  }
}
