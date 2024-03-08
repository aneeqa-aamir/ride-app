import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";

function Destination({ navigation, route }) {
  const { pickup } = route.params;
  const [location, setLocation] = useState(null);

  const [places, setPlaces] = useState([]);
  const [destination, setDestination] = useState();

  useEffect(() => {
    (async () => {
      //   let { status } = await Location.requestForegroundPermissionsAsync();
      //   if (status !== "granted") {
      //     setErrorMsg("Permission to access location was denied");
      //     return;

      Location.watchPositionAsync(
        {
          accuracy: 6,
          distanceInterval: 1,
          timeInterval: 1000,
        },
        (location) => {
          console.log("location", location);
          setLocation(location);
        }
      );
    })();
  }, []);

  const searchPlaces = (text) => {
    setDestination(null); // Clear previous selected pickup

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "fsq39meUhYbzW5k5FEnoRlc95D5mV+iJjq38lnVn/mLG/tQ=", // Fixed missing 'Bearer' prefix
      },
    };
    const { latitude, longitude } = location.coords;

    fetch(
      `https://api.foursquare.com/v3/places/search?=${text}&ll=${latitude},${longitude}&radius=3000`,
      options
    ) // Fixed URL formatting
      .then((response) => response.json())
      .then((response) => {
        console.log(response, "Response");
        setPlaces(response.results);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Error fetching places. Please try again."); // Display error message
      });
  };

  const onPlaceSelect = (item) => {
    setDestination(item);
  };

  if (!location) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <View>
        <Text> your selected pickup location is</Text>
        <Text>
          {pickup.name},{pickup.location.address}
        </Text>
      </View> */}

      <Text style={styles.text}>Destination</Text>
      <TextInput style={styles.input}
        placeholder="select your destination location"
        onChangeText={searchPlaces}
      />
      {!destination && (
        <View>
          {places.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)}>
                <Text>
                  {item.name},{item.location.address}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {destination && (
        <View>
          <Text style={styles.para}> your selected destination location is</Text>
          <Text>
            {destination.name},{destination.location.address}
          </Text>
        </View>
      )}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
        />
      </MapView>

      <Button title="vehicles" onPress={() => navigation.navigate("vehicleSelection",{pickup,destination})} />
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  Button: {
    flex: 1,
    backgroundColor: "blue",
  },
  map: {
    width: "100%",
    height: "70%",
  },
  input:{
    width: 300,
    height: 50,
    borderWidth: 2, // Border width
    borderColor: 'black', // Border color
    borderRadius: 10, // Border radius
    borderStyle: 'solid', // Border style
    backgroundColor: "#ECE4E2",
    paddingLeft:12,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
  },
  para: {
    fontSize: 18,
  },
});

export default Destination;
