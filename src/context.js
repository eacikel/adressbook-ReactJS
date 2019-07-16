import React, { Component } from 'react'

const UserContext = React.createContext(); // Provider ve Consumer objelerini sağlayan context oluştu

const reducer = (state,action) => {
    switch(action.type){
        case "DELETE_USER":
            return{
                ...state,
                users : state.users.filter(user => action.payload !== user.id)
            }
        case "ADD_USER":
            return{
                ...state,
                users : [...state.users,action.payload]
            }
        default:
            return state
    }
}

export class UserProvider extends Component {
    state ={
        filterKey: '',
        users : [
          {
            id : "unique-1",
            name : "Eren",
            surname : "Açıkel",
            phone : "05467912124"
          },
          {
            id: "unique-2",
            name : "Semih",
            surname : "Keskin",
            phone : "03622342764"
          },
          {
            id: "unique-3",
            name : "Kadircan",
            surname : "Keskin",
            phone : "05417661138"
          },
          {
            id: "unique-4",
            name : "İrem",
            surname : "Sevim",
            phone : "05374472826"
          }
        ],
        dispatch : action => {
            this.setState(state => reducer(this.state,action))
        }
    }
    changeInput = (e) => {
        this.setState({
            filterKey:e.target.value
        })
    }

    render() {
        const {filterKey} = this.state;
        return (
           <UserContext.Provider value = {this.state}>
                  <form>
                    <input
                        type = "text"
                        name = "name"
                        id = "id"
                        placeholder = "Enter Info..."
                        className = "form-control"
                        value = {filterKey}
                        onChange = {this.changeInput}
                    />
                  </form>
                  
               {this.props.children}
           </UserContext.Provider>
        )
    }
}
const UserConsumer = UserContext.Consumer;

export default UserConsumer;