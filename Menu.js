import React, { Component } from 'react';
import {
  Button,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


class Menu extends React.Component {
    constructor() {
      super();
      this.state={id:'', first_name:'', last_name:'', email:'', phone:'', birthday:'', photo: "", qr: "", passe: ""}
    }


    getData=(things)=>{
        this.setState({first_name:things['id']});
        this.setState({last_name:things['first_name']});
        this.setState({email:things['last_name']});
        this.setState({phone:things['email']});
        this.setState({birthdayqr:things['phone']});
        this.setState({photo:things['birthday']});
        this.setState({id:things['photo']});
        this.setState({qr:things['qr']});
        this.setState({qr:things['passe']});
    }
    
  
    render() {
      var things = this.props.route.params;
      return (
        <View style={styles.container}>
            <View>
                <Text style={styles.name}>Olá {things['first_name']} {things['last_name']}, </Text>
                <Text style={styles.pretend}>O que pretendes?</Text>
            </View>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile', { 
                    id: things['id'],
                    first_name: things['first_name'],
                    last_name: things['last_name'],
                    email: things['email'],
                    birthday: things['birthday'],
                    phone: things['phone'],
                    qr: things['qr'],
                    photo: things['photo'],
                    passe:things['passe']
                })
            }}>
                <View style={styles.buttons}>
                    <Text style={styles.headerText}>Meu Perfil</Text>
                    <Text style={styles.arrow}>&#10140;</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Select', { 
                    id: things['id'],
                    first_name: things['first_name'],
                    last_name: things['last_name'],
                    email: things['email'],
                    birthday: things['birthday'],
                    phone: things['phone'],
                    qr: things['qr'],
                    photo: things['photo'],
                    passe: things['passe']
                })}}>
                <View style={styles.buttons}>
                    <Text style={styles.headerText}>Meu Cartão</Text>
                    <Text style={styles.arrow}>&#10140;</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                <View style={styles.buttons}>
                    <Text style={styles.headerText}>Comprar Bilhete</Text>
                    <Text style={styles.arrow}>&#10140;</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                <View style={styles.buttons}>
                    <Text style={styles.headerText}>Viajar</Text>
                    <Text style={styles.arrow}>&#10140;</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                <View style={styles.buttons}>
                    <Text style={styles.headerText}>Estado dos transportes</Text>
                    <Text style={styles.arrow}>&#10140;</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                <View style={styles.buttons}>
                    <Text style={styles.headerText}>Histórico das Atividades</Text>
                    <Text style={styles.arrow}>&#10140;</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                <View style={styles.buttons}>
                    <Text style={styles.headerText}>Passes Mensais</Text>
                    <Text style={styles.arrow}>&#10140;</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                <View style={styles.buttons}>
                    <Text style={styles.headerText}>Trajetos Frequentes</Text>
                    <Text style={styles.arrow}>&#10140;</Text>
                </View>
            </TouchableOpacity>
        </View>
        
        
      );
    }
}
export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    createSpace: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    arrow: {
        color: '#CB9535',
    },
    pretend: {
        color: '#CB9535',
        fontSize: 22,
        textAlign: 'center',
    },
    name: {
        color: '#CB9535',
        paddingTop:80,
        fontSize: 30,
        textAlign: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        color: '#000',
        width: 300,
        alignSelf: 'center',
        padding: 15,
        marginTop: 15,
        borderRadius: 15,
    },
});
  