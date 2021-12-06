import { StatusBar } from 'expo-status-bar';
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
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Profile from "./Profile.js"
import QR from "./QR.js"
import Menu from "./Menu.js"
import Select from "./Select.js"
import RegistrationScreen from "./RegistrationScreen.js"
import Login from "./LoginScreen"

const Stack = createNativeStackNavigator();




function doThings(navigationRef) {
  const route = useRoute();
  console.log(route.name)
  navigationRef.navigate('Menu')
}


class App extends React.Component {
  constructor() {
    super();
    this.state={id:'', first_name:'', last_name:'', email:'', phone:'', birthday:'', photo: "", qr: ""}
  }
 
  render() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerLeft: () => (
        <TouchableOpacity onPress={() => {
          var par = navigationRef.current.getRootState()["routes"][navigationRef.current.getRootState()["routes"].length-1]["params"];
          navigationRef.navigate('Menu', {
            id: par["id"],
            first_name: par["first_name"],
            last_name: par["last_name"],
            email: par["email"],
            phone: par["phone"],
            birthday: par["birthday"],
            photo: par["photo"],
            qr: par["qr"],
          });
        
        }}>
          <View style={styles.buttons}>
          <FontAwesome name='bars' color='#CB9535'/>
          </View>
        </TouchableOpacity>
          ),}}>
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={Profile} options={{title: ''}} />
        <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}} />
        <Stack.Screen name="QR" component={QR} options={{title: ''}} />
        <Stack.Screen name="Select" component={Select} options={{title: ''}} />
        <Stack.Screen name="Login" component={Login} options={{title: ''}} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}
export default App;


const styles = StyleSheet.create({
  buttons: {
    scaleX: 2,
    scaleY: 2,
    paddingLeft: 3,
  },
});