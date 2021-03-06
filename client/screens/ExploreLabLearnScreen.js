import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  SectionList,
  Text,
  TouchableHighlightBase
} from 'react-native';
import colors from '../assets/colors';
import Card from "../components/Card";
import Accordion from '../components/Accordion'
import TabBarIcon from "../components/TabBarIcon";
import {HOST_NAME} from "../constants/Constants";
import offline from "../Offline.js";

export default class ExploreLabLearnScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu : null,
     }

    //  This logic handles all the offline functionality
     this.off =  new offline;

        //These nested promises are meant to see if online or offline mode should be used.
      let promise = new Promise((resolve, reject) => {
          resolve(this.off.FetchHierarchy());
      }) 
      
      //depending whether the offline button is toggled on or off, fetch from local or remote, respectively.
      promise.then((data) => {
        this.setState({menu: data});
      })
      .catch((error)=> {
        console.error(error);
      });

  }

  componentDidMount() {
    //this.apiFetch();
  }

  // This function fetches all the regions and their associated subregions
  apiFetch() {
    var host = HOST_NAME

    fetch(host+'/hierarchy')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({menu: responseJson[0]});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // This function renders all the regions and subregions into a hierarchy menu
  renderAccordions=()=> {
    const items = [];
    if (this.state.menu) {
      this.state.menu.regions.map((item) => {
        items.push(
                <Accordion
                    title = {item.region}
                    data = {item.subRegions}
                    key = {item.region}
                    id = {item.region}
                    path = "ExploreLabLearnDropdownOption"
                    image = {item.imageUrl}
                    navigation = {this.props.navigation}
                    type = "explore"
                />
            );
      })
    }
    return items;
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Learn',
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerRight: (
      <TabBarIcon
        style={{marginRight: 15}}
        name={Platform.OS === "ios" ? "ios-information-circle" : "ios-information-circle"}
        onPress={() => navigation.navigate('AboutUs')}
      />
    ),
  });

  // This code is in charge of rendering all the content in this file
  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            {this.renderAccordions()}
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "#fff"
  }
});
