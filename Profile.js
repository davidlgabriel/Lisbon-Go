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
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class ExpandableItemComponent extends Component {
    //Custom Component for the Expandable List
    constructor() {
        super();
        this.state = {
        layoutHeight: 0,
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.item.isExpanded) {
        this.setState(() => {
            return {
            layoutHeight: null,
            };
        });
        } else {
        this.setState(() => {
            return {
            layoutHeight: 0,
            };
        });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.layoutHeight !== nextState.layoutHeight) {
        return true;
        }
        return false;
    }

    render() {
        return (
        <View>
            {/*Header of the Expandable List Item*/}
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.onClickFunction}
            style={styles.header}>
            <View style={styles.createSpace}>
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
                <Text style={styles.plusSign}>+</Text>
            </View>
            </TouchableOpacity>
            <View
            style={{
                height: this.state.layoutHeight,
                overflow: 'hidden',
            }}>
            {/*Content under the header of the Expandable List Item*/}
            {this.props.item.subcategory.map((item, key) => (
                <TouchableOpacity
                key={key}
                style={styles.content}
                onPress={() => this.props.navigation.navigate('QR', { 
                    id: this.props.things['id'],
                    first_name: this.props.things['first_name'],
                    last_name: this.props.things['last_name'],
                    email: this.props.things['email'],
                    birthday: this.props.things['birthday'],
                    phone: this.props.things['phone'],
                    qr: this.props.things['qr'],
                    photo: this.props.things['photo']
                })}>
                <Text style={styles.text}>
                    {item.val}
                </Text>
                {item.img? 
                <Image
                    source={require('./viva-viagens.jpg')}
                />: null }
                <View style={styles.separator} />
                </TouchableOpacity>
            ))}
            </View>
        </View>
        );
    }
}

class Profile extends React.Component {
    constructor() {
        super();
        if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.state={listDataSource: CONTENT, id:'', first_name:'', last_name:'', email:'', phone:'', birthday:'', photo: "", qr: ""}
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

    updateLayout = index => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...this.state.listDataSource];
        array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] =
             !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
        this.setState(() => {
        return {
            listDataSource: array,
        };
        });
    };

    render() {
        var things = this.props.route.params;
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.myProfileView}>
                <Text style={styles.myProfileText}>Meu Perfil</Text>
                <View style={{ borderBottomColor: '#CB9535', borderBottomWidth: 2.5, width: '50%', }}/>
            </View>
            <View style={styles.firstColumn}>
                <Image
                    style={styles.stretch}
                    source={{uri: this.state.photo ,}}
                />
                <View>
                    <Text style={styles.name}>{things["first_name"]}</Text>
                    <Text style={styles.name}>{things["last_name"]}</Text>
                    <Text style={[styles.name, styles.idade]}>{things["birthday"]}</Text>
                </View>
            </View>
            <ScrollView>
            {this.state.listDataSource.map((item, key) => (
                <ExpandableItemComponent
                things={things}
                navigation={this.props.navigation}
                key={item.category_name}
                onClickFunction={this.updateLayout.bind(this, key)}
                item={item}
                />
            ))}
            </ScrollView>
            <View style={styles.analiseView}>
                <Text style={styles.analiseText}>Análise</Text>
                <View style={{ borderBottomColor: '#CB9535', borderBottomWidth: 2.5, width: '50%', }}/>
            </View>
        </SafeAreaView>
        );
    }
}

export default Profile;

const CONTENT = [
    {
      isExpanded: false,
      category_name: 'Pass Sub 23',
      subcategory: [{ id: 1, val: '1', img: './profile.jpg' }, ],
      
    },
    {
      isExpanded: false,
      category_name: 'Bilhetes Válidos',
      subcategory: [{ id: 4, val: '1' }, { id: 5, val: '' }],
    },
    {
      isExpanded: false,
      category_name: 'As minhas viagens',
      subcategory: [{ id: 7, val: '' }, { id: 9, val: '2' }],
    },
];

  
const styles = StyleSheet.create({
container: {
    flex: 0.9,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
},
myProfileText: {
    paddingTop: 30,
    fontSize: 20,
    textAlign: 'right',
    paddingBottom: 5,
},
myProfileView: {
    alignItems: 'flex-end',
    paddingRight: 30,
},
analiseText: {
    fontSize: 14,
    textAlign: 'left',
    paddingBottom: 15,
},
analiseView: {
    paddingLeft: 30,
    alignItems: 'flex-start',
},
firstColumn: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
},
name: {
    fontSize: 22,
    marginLeft: 20,
},
idade: {
    fontSize: 10,
},
stretch: {
    marginLeft: 20,
    width: 110,
    height: 110,
    borderRadius: 100,
    overflow: "hidden",
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#CB9535',
},
topHeading: {
    paddingLeft: 10,
    fontSize: 20,
},
header: {
    backgroundColor: '#fff',
    position: 'relative',
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
},
createSpace: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
},
plusSign: {
    color: '#CB9535',
},
headerText: {
    fontSize: 15,
    fontWeight: '500',
},
separator: {
    height: 0.5,
    backgroundColor: '#CB9535',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
},
text: {
    fontSize: 16,
    color: '#606070',
},
content: {
    width: '80%',
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F5F5F5',
},
});