import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,Button, Image, TouchableWithoutFeedback , Keyboard} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo-linear-gradient';

export default class RegistrationScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={id:'', first_name:'', last_name:'', email:'', password:'', phone:'', birthday:'', photo: "", qr: ""}
    }

    InsertData = () => {
        var email=this.state.email;
        var id =this.state.id;
        var first_name=this.state.first_name;
        var last_name=this.state.last_name;
        var password=this.state.password;
        var birthday=this.state.birthday;
        var phone=this.state.phone;
        if (email.length == 0) {
            alert("What is happening my friend");
        }else{
            var InsertAPIURL = "http://192.168.1.86/register.php";

            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };

            var Data={
                id:id,
                first_name:first_name,
                last_name:last_name,
                email:email,
                password:password,
                birthday:birthday,
                phone:phone

            };
            

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
            })
            .catch((error)=>{
                alert("Error" + error)
            })
        }
    }
    render(){
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
                            <Text style={styles.textAboveInput}>Insere o teu Primeiro nome</Text>
                            <TextInput 
                                onChangeText={first_name => this.setState({first_name}) }
                                style={styles.input}
                            ></TextInput>
                            <Text style={styles.textAboveInput}>Insere o teu Último nome</Text>
                            <TextInput 
                                onChangeText={last_name => this.setState({last_name}) }
                                style={styles.input}
                            ></TextInput>
                            <Text style={styles.textAboveInput}>Insere o teu Emai</Text>
                            <TextInput 
                                onChangeText={email=>this.setState({email})}
                                style={styles.input}
                            ></TextInput>
                            <Text style={styles.textAboveInput}>Insere a tua Password</Text>
                            <TextInput 
                                onChangeText={password => this.setState({password}) }
                                style={styles.input}
                                secureTextEntry
                            ></TextInput>
                            <Text style={styles.textAboveInput}>Insere o teu Número de Telemóvel</Text>
                            <TextInput  
                                onChangeText={phone => this.setState({phone}) }
                                style={styles.input}
                            ></TextInput>
                            <Text style={styles.textAboveInput}>Insere a tua Data de Nascimento</Text>
                            <TextInput 
                                onChangeText={birthday => this.setState({birthday}) }
                                style={styles.input}
                            ></TextInput>
                            <TouchableOpacity onPress={this.InsertData} >
                                <View style={styles.buttons}>
                                    <Text style={styles.headerText}>Registar</Text>
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
