import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from "../context";

var uniqid = require('uniqid');

const Animation = posed.div(
    {
        visible : {
            opacity : 1,
            applyAtStart :{
                display : "block"
            }
        },
        hidden : {
            opacity : 0,
            applyAtEnd :{ 
                display : "none"
            }
        }
    }
);

class AddUser extends Component {
    state ={
        visible : false,
        name : "",
        surname : "",
        phone : "",
        error : false
    }
    toUpper=(text)=>{ //İnputlabel ların ilk harflerini büyük harfe çevirme
        return text.charAt(0).toUpperCase() +text.slice(1);
    }
    changeVisibility = (e) => {
        this.setState({
            visible : !this.state.visible
        })
    }
    validateForm = () =>{ //ad soyad en az 2 karakter telefon boş olamaz
        const {name,surname,phone} = this.state;
        if(name.length < 2  || surname.length <3 || phone.length<1){
            return false;
        }
        return true;

    }
    changeInput = (e) => {
        this.setState({
            [e.target.name] :this.toUpper( e.target.value)
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addUser = (dispatch,e) => {
        e.preventDefault(); //butona bastığında otomatik olarak sayfanın yenilenmesi engellenmiş oldu
        const {name,surname,phone} = this.state;

        const newUser ={ //yeni kullanıcı verileri 
            id : uniqid(),
            name,
            surname,
            phone
        }
        if(!this.validateForm()){
            this.setState({
                error : true
            })
            return;
        }
        dispatch({type : "ADD_USER",payload : newUser});
    }

    render() {
        const {visible,name,surname,phone,error} = this.state;
        
        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className = "col-md-8 mb-4">                          
                            <button onClick ={this.changeVisibility} className = "btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                            <Animation pose = {visible ? "visible" : "hidden"}>
                            <div className = "card">
                                <div className = "card-header">
                                    <h4>Add User Form</h4>
                                </div>
                                <div className = "card-body">
                                    {
                                        error ?
                                            <div className = "alert alert-danger">
                                                Lütfen Bilgilerinizi Kontrol Edin!
                                            </div>
                                        : null
                                    }
                                    <form onSubmit = {this.addUser.bind(this,dispatch)}>
                                        <div className = "form-group">
                                            <label htmlFor = "name">Name</label>
                                            <input
                                            type = "text"
                                            name = "name"
                                            id = "id"
                                            placeholder = "Enter Name..."
                                            className = "form-control"
                                            value = {name}
                                            onChange = {this.changeInput}
                                            />
                                        </div>
                                        <div className = "form-group">
                                            <label htmlFor = "surname">Surname</label>
                                            <input
                                            type = "text"
                                            name = "surname"
                                            id = "surname"
                                            placeholder = "Enter Surname..."
                                            className = "form-control"
                                            value = {surname}
                                            onChange = {this.changeInput}
                                            />
                                        </div>
                                        <div className = "form-group">
                                            <label htmlFor = "phone">Phone</label>
                                            <input
                                            type = "text"
                                            name = "phone"
                                            id = "phone"
                                            placeholder = "Enter Phone..."
                                            className = "form-control"
                                            value = {phone}
                                            onChange = {this.changeInput}
                                            />
                                        </div>
                                        <button className = "btn btn-danger btn-block" type = "submit">Add User</button>
                                    </form>
                                </div>
                            </div>
                            </Animation>
                        </div>
                    )
                }
            }
        </UserConsumer>  
    }
}
export default AddUser;