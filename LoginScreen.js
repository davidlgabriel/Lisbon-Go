import React, {Component} from 'react';
import {StyleSheet, TextInput, View,Button } from 'react-native';

export default class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={id:'', first_name:'', last_name:'', email:'', password:'', phone:'', birthday:'', photo: "", qr: ""}
    }

    InsertData=()=>{
        var email=this.state.email;
        var password=this.state.password;
        console.log(email, password)
        if (email.length == 0) {
            alert("wow");
        }else{

            var InsertAPIURL = "http://192.168.1.86/login.php";

            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };

            var Data={
                email:email,
                password:password,            
            };

            console.log(Data);
            

            fetch(
              InsertAPIURL,
              {
                  method:'POST',
                  headers:header,
                  body: JSON.stringify(Data)
              }  
            )
            .then((response)=>response.json())
            .then((response)=>{
                console.log(response[0].Message);
                if (response[0].Message == "200"){
                    this.setState({id:response[0].id});
                    this.setState({email:response[0].email});
                    this.setState({first_name:response[0].first_name});
                    this.setState({last_name:response[0].last_name});
                    this.setState({birthday:response[0].birthday});
                    this.setState({phone:response[0].phone});
                    this.setState({photo:response[0].photo});
                    this.setState({qr:response[0].qr});
                    this.props.navigation.navigate('Menu', { 
                        id: this.state.id,
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        email: this.state.email,
                        birthday: this.state.birthday,
                        phone: this.state.phone,
                        qr: this.state.qr,
                        photo: this.state.photo
                    } );
                    
                }

                else {
                    alert("Mete bem a pass rapaz!");
                }
                
            })
            .catch((error)=>{
                alert("Error" + error)
            })
        }
    }
    render(){
        return(
             <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder={"Email" }
                        onChangeText={email=>this.setState({email})}
                        style={styles.input}
                    ></TextInput>
                    <TextInput 
                        placeholder="Password"  
                        onChangeText={password => this.setState({password}) }
                        style={styles.input}
                        secureTextEntry
                    ></TextInput>
                    <Button
                        title={"Registar"}
                        onPress={this.InsertData} 
                    />
                </View>
                    
    
        )

    }
}


const styles= StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width:'88%'
    },
    input:{

        backgroundColor:'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 70, 
    },
    buttonContainer:{
        width:'60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button:{
        backgroundColor: '#0782F9',
        width: '100%',
        padding:15,
        borderRadius: 10,
        alignItems:'center',
    },
    buttonText:{
        color:'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor: '#0782F9',
        borderWidth:2,

    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight:'700',
        fontSize:16,
    },
    background: {
        flex: 1,
        justifyContent: "flex-end"
      },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#fff'
      },
    
      registerButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#4ecdc4'
      } 
})
