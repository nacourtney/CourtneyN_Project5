import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 33.307146,
      longitude: -111.68177,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>
          Logitude: {this.state.longitude} Latitude: {this.state.latitude}
        </Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            image={require("./Markers/you-are-here.png")}
          ></Marker>
        </MapView>
        <StatusBar style="auto" />
        <View style={styles.button}>
          <Button title="Current Location">
            <Text>Current Location</Text>{" "}
          </Button>
        </View>
        <View style={styles.button}>
          <Button
            title="POI 1"
            onPress={() =>
              this.setState(
                { latitude: 33.307146 },
                this.setState({ longitude: -111.68177 })
              )
            }
          >
            <Text style={styles.buttonFont}>Point of Interest 1</Text>
          </Button>
        </View>
        <View style={styles.button}>
          <Button
            title="POI 2"
            onPress={() =>
              this.setState(
                { latitude: 33.423204 },
                this.setState({ longitude: -111.939612 })
              )
            }
          >
            <Text>Point of Interest 2</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 0.5,
    borderRadius: 15,
    borderWidth: 3,
    height: "50%",
    width: "100%",
  },
  button: {
    flex: 0.05,
    backgroundColor: "black",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    margin: 7,
  },
  buttonFont: {
    color: "black",
  },
});
