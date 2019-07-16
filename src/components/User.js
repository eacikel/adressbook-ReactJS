import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from "../context";

class User extends Component {

    state ={
        isVisible : false,
        term:this.context.User
    }

    onClickEvent(e){
        this.setState({
            isVisible : !this.state.isVisible
        })
    }
    onDeleteUser = (dispatch,e) => {
        const {id} = this.props;
        // consumer dispatch
        dispatch({type : "DELETE_USER",payload:id});
    }

    render() {
        
        //Destructing
        const {name,surname,phone} = this.props;
        const {isVisible} = this.state;

        return (
        <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return(
                        
                        <div className = "col-md-8 mb-4">
                            
                            <div className = "card" style ={isVisible ? {backgroundColor : "#5F2B1E" , color : "white"} : null}>
                             
                                <div className = "card-header d-flex justify-content-between">
                                    <h4 className = "d-inline" onClick = {this.onClickEvent.bind(this)} style = {{cursor : "pointer"}}> {name} {surname} </h4>
                                    <i className="fas fa-trash-alt" onClick = {this.onDeleteUser.bind(this,dispatch)} style = {{cursor : "pointer"}}></i>
                                    
                                </div>
                                {
                                    isVisible ? <div className = "card-body"><p className = "card-text"> Phone : {phone} </p></div>
                                    : null
                                }
                   
                            </div>
                        </div>
                    )
                }
            }
        </UserConsumer>
        )
    }
}
User.defaultProps = {
    name : "Bilgi Yok",
    surname : "Bilgi Yok",
    phone : "Bilgi Yok"
}
User.propTypes = {
    name : PropTypes.string.isRequired,
    surname : PropTypes.string.isRequired,
    phone : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired
}
export default User;