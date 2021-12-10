import React, { Component } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class Select extends React.Component {
    constructor() {
      super();
      this.state={id:'', first_name:'', last_name:'', email:'', phone:'', birthday:'', photo: "", qr: "",passe:""}
    }
    
    getData=(things)=>{
        this.setState(things['id']);
        this.setState(things['first_name']);
        this.setState(things['last_name']);
        this.setState(things['email']);
        this.setState(things['phone']);
        this.setState(things['birthday']);
        this.setState(things['photo']);
        this.setState(things['qr']);
    }

    render() {
        var things = this.props.route.params;
        return (
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
           <Text style={styles.header}>Escolhe o teu meio de transporte preferido!</Text>
           <Text style={styles.txt}>Só não vás a pé...</Text>
         </View>
        <View style={styles.content}> 
         <View style={styles.row}> 
         <TouchableOpacity onPress={() => {alert("Carreguei")}}>
                <View style={styles.buttons}>
                  <Image source={require("./5.png")}/>
                  <Text>Carris</Text>
                </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => {alert("Carreguei")}}>
                <View style={styles.buttons}>
                  <Image source={require("./6.png")}/>
                    <Text>Comboio</Text>
                </View>
      </TouchableOpacity>
     </View>
      <View style={styles.row}> 
          <TouchableOpacity onPress={() => {alert("Carreguei")}}>
                <View style={styles.buttons}>
                <Image source={require("./7.png")}/>
                <Text>Metro</Text>
               
                    
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {alert("Carreguei")}}>
                <View style={styles.buttons}>
                <Image source={require("./8.png")}/>
                    <Text>Rodoviária</Text>
                </View>
        </TouchableOpacity>
    </View>
  </View>

  </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      },
      
      header: {
          marginTop: 25,
          textAlign: 'center',
          fontSize: 30,
          fontWeight: '500',
      
      },
    
      txt: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '200',
    
    },
    
      buttons: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        //marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
    
        backgroundColor: '#859a9b',
        borderRadius: 20,
        padding:25,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
    
      },
    
      content: {
        flex: 1,
            marginTop: 55,
            marginBottom: 150,
            backgroundColor: '#F5F5F5',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'space-around'
      },
    
      row: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'space-evenly'
      }
    });



export default Select;


  