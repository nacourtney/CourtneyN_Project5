import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
} from "react-native";
import Notification from "./Notification";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default class App extends Component {
  state = {
    notify: false,
    message: "This is a notification!",
    latitude: 33.307146,
    longitude: -111.68177,
    location: null,
  };

  async getLocation() {
    let location = await Location.getLastKnownPositionAsync();
    this.setState({
      latitude: location.latitude,
      longitude: location.longitude,
    });
  }

  toggleNotification = () => {
    this.setState({
      notify: !this.state.notify,
    });
  };

  async getLocationTest() {
    this.state.latitude = 45.7762;
    this.state.longitude = -111.1771;
    console.log(this.state.latitude);
    console.log(this.state.longitude);
  }

  async componentDidMount() {
    let permission = await Location.requestForegroundPermissionsAsync();
    let location = await Location.getLastKnownPositionAsync();

    this.setState({
      latitude: location.latitude,
      longitude: location.longitude,
    });

    //this.setState();
    console.log(permission);
    console.log(location);
    //this.getLocation();
  }

  render() {
    const notify = this.state.notify ? (
      <Notification
        autoHide
        message={this.state.message}
        onClose={this.toggleNotification}
      />
    ) : null;
    return (
      <SafeAreaView>
        <Text style={styles.toolbar}>
          Longitude: {this.state.longitude} Latitude: {this.state.latitude}
        </Text>
        <Text></Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {notify}
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            image={require("./Markers/you-are-here.png")}
          ></Marker>
        </MapView>
        <View style={styles.btn}>
          <Button
            title="Current Location"
            onPress={() => this.setState(this.componentDidMount())}

            //onPressOut={fadeIn}
          >
            <Text>Current Location</Text>
          </Button>
        </View>
        <View style={styles.btn}>
          <Button
            title="POI 1"
            onPress={() =>
              this.setState(
                { latitude: 33.423204 },
                this.setState({ longitude: -111.939612 })
              )
            }
          >
            <Text style={styles.buttonFont}>Point of Interest 1</Text>
          </Button>
        </View>
        <View style={styles.btn}>
          <Button
            title="POI 2"
            onPress={() =>
              this.setState(
                { latitude: 33.307146 },
                this.setState({ longitude: -111.681177 })
              )
            }
          >
            <Text>Point of Interest 2</Text>
          </Button>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={this.toggleNotification}
            style={styles.btn}
          ></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "#8e44ad",
    color: "#fff",
    fontSize: 22,
    padding: 20,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 5,
  },
  // content: {
  //   padding: 10,
  //   overflow: "hidden",
  //   borderColor: "deeppink",
  //   borderWidth: 5,
  // },
  btn: {
    margin: 10,
    backgroundColor: "#9b59b6",
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "black",
    padding: 10,
  },
  text: {
    textAlign: "center",
    color: "#fff",
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderWidth: 5,
  //   borderColor: "red",
  //   borderRadius: 5,
  // },
  map: {
    //flex: 1,
    borderRadius: 15,
    borderWidth: 3,
    height: "50%",
    width: "100%",
    borderColor: "blue",
  },
});
