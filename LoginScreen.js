import React, {Component} from 'react';
import { Dimensions, KeyboardAvoidingView, useState, StyleSheet, Text, TextInput, TouchableOpacity, View,Button, Image, TouchableWithoutFeedback , Keyboard, ImageBackground, Linking} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as LocalAuthentication from 'expo-local-authentication';


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
                    alert("Incorrect Username or Password.");
                }
                
            })
            .catch((error)=>{
                alert("Error" + error)
            })
        }
    }
    

    render(){
        return(
            <ImageBackground style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height + 50, position: 'absolute',}}
                    source={require('./fundo2.jpg')}>
                        
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.bigText}>Há comboios que só passam uma vez...</Text>
                        <Text style={styles.smallText}>Não percas o teu!</Text>
                    </View>
                    
                    
                        <View style={styles.inputContainer}>
                            <KeyboardAwareScrollView  enableOnAndroid={true}>
                            <Text style={styles.textAboveInput}>Insere o teu Email</Text>
                            <TextInput  
                                onChangeText={email => this.setState({email})}
                                style={styles.input}
                            ></TextInput>
                            <Text style={styles.textAboveInput}>Insere a tua Password</Text>
                            <TextInput 
                                value={this.state.password}
                                onChangeText={password => this.setState({password})}
                                style={styles.input}
                                secureTextEntry
                                ></TextInput>
                            <TouchableOpacity onPress={this.InsertData} >
                                <View style={styles.login}>
                                    <Text style={styles.headerText}>Login</Text>
                                </View>
                            </TouchableOpacity>
                                <Text style={styles.register} onPress={() => {this.props.navigation.navigate('RegistrationScreen')}}>
                                    Ainda não tens conta? Regista-te!
                                </Text>
                                </KeyboardAwareScrollView>
                    </View>
                    
                    
                </View> 
                
            </ImageBackground> 
    
        )

    }
}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    content: {
        paddingBottom: 90,
        backgroundColor: 'transparent',
        flexDirection: 'column', 
        alignItems: 'center',
    },
    bigText: {
        color: '#fff',
        fontSize: 32,
        textAlign: 'center',
     },
    smallText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
    },
    register: {
        zIndex: 1,
        textAlign: 'center',
        color: '#000',
        fontSize: 12,
    },
    inputContainer: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        width:'100%',
        borderRadius: 15,
        paddingBottom: 50,
    },
    input:{
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        width:'88%',
        marginLeft: 22,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5, 
    },
    textAboveInput: {
        marginLeft: 22,
        paddingTop: 15,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        
    },
    buttons: {
        backgroundColor: '#B98831',
        color: '#000',
        width: 300,
        height: 50,
        alignSelf: 'center',
        padding: 15,
        marginTop: 15,
        borderRadius: 15,
    },
    login: {
        backgroundColor: '#B98831',
        width: 300,
        height: 50,
        alignSelf: 'center',
        padding: 15,
        marginTop: 15,
        borderRadius: 15,
    },
})
