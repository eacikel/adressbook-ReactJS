import React, { Component } from 'react'
import User from "./User";
import UserConsumer from "../context";

class Users extends Component {

    filterUsers(filterKey, user) {
        if (!filterKey) return true
        return (
            user.name.toLowerCase().includes(filterKey.toLowerCase()) ||
            user.surname.toLowerCase().includes(filterKey.toLowerCase()) ||
            user.phone.includes(filterKey)
        )
    }

    render() {
        return(
            <UserConsumer>
            {
                value => {
                    const {users,filterKey} = value
                    return (
                        <div>
                            {
                                users.filter(this.filterUsers.bind(this,filterKey)).map(user => {
                                    return (
                                        <User 
                                            key = {user.id}
                                            id = {user.id}
                                            name = {user.name}
                                            surname = {user.surname}
                                            phone ={user.phone}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
            }
            </UserConsumer>
        )
    }
}
export default Users;