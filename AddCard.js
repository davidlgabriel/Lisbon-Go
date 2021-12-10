import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,Button, Image, TouchableWithoutFeedback , Keyboard} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo-linear-gradient';

export default class AddCard extends React.Component{
    constructor(props){
        super(props);
        this.state={pass: '', cc: '', id:'', first_name:'', last_name:'', email:'', password:'', phone:'', birthday:'', photo: "", qr: "", passe:""}
    }

    InsertData = (things) => {
        var email=this.state.email;
        var id =things['id'];
        var passe = this.state.passe;
        var cc =this.state.cc;
        console.log(id,passe,cc);

        if (passe.length == 0) {
            alert("What is happening my friend");
        }else{
            var InsertAPIURL = "http://192.168.1.36/card.php";

            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };

            var Data={
                id:id,
                cc:cc,
                passe:passe
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
                if (response[0].Message=="200") {
                    this.setState({qr:response[0].qr});
                    this.setState({passe:response[0].passe});
                    this.props.navigation.navigate('Profile', { 
                        id: things['id'],
                        first_name: things['first_name'],
                        last_name: things['last_name'],
                        email: things['email'],
                        birthday: things['birthday'],
                        phone: things['phone'],
                        qr: this.state.qr,
                        photo: things['photo'],
                        passe: this.state.passe
                    });
                    
                }else{
                    alert("Errorrrrrr!") 
                }
              
            })
            .catch((error)=>{
                alert("Error" + error)
            })
        }
    }
    render(){
        var things = this.props.route.params;
        return(
            <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <View>
                            
                        <LinearGradient colors={['#B98831', '#F1CA87']} style={styles.back}>
                        <Image
                            style={styles.image}
                            source={require('./lisbongo.png')}
                            />
                        </LinearGradient>
                        
                        
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.textAboveInput}>Insere o Número do teu passe</Text>
                            <TextInput 
                                onChangeText={passe => this.setState({passe}) }
                                style={styles.input}
                            ></TextInput>
                            <Text style={styles.textAboveInput}>Insere o Número do teu CC</Text>
                            <TextInput 
                                onChangeText={cc => this.setState({cc}) }
                                style={styles.input}
                            ></TextInput>
                            
                            <TouchableOpacity onPress={() =>{this.InsertData(things)}} >
                                <View style={styles.buttons}>
                                    <Text style={styles.headerText}>Adicionar Cartão</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                    
    
        )

    }
}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        resizeMode: 'stretch',
     },
    back: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        height: 200,
    },
    inputContainer: {
        flex: 0.1,
        flexDirection: 'column',
        alignContent: 'center',
        width:'88%'
    },
    input:{
        backgroundColor: '#F5F5F5',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5, 
    },
    textAboveInput: {
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
})
