import React, { Component } from 'react';
import {
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

class QR extends React.Component {
    constructor() {
      super();
      this.state={id:'', first_name:'', last_name:'', email:'', phone:'', birthday:'', photo: "", qr: ""}
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
    }

    render() {
      var things = this.props.route.params;
      return (
        <View style={styles.container}>
        <Image
          style={styles.qr}
          source={{uri: things['qr'],}}
        />
        <Text>QRCODE</Text>
        </View>
      );
    }
}
export default QR;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    qr: {
        marginTop: 150,
        width: 250,
        height: 250,
        resizeMode: 'stretch',
    },
});
  