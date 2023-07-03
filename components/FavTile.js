import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";


export default FavTile = (props) => {
  const favIconName = props.isFav ? "ios-heart-circle" : "ios-heart-circle-outline";

  return (
    <View style={styles.itemContainer}>
      <Button
        onPress={() => {props.onFav(props.id)}}
        type="clear"
        icon={
          <Ionicons name={favIconName} size={28} color='#FFF' />
        }
      />
       <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.text}</Text>
        <Image source={props.image} style={styles.image}/>
      </View>
      
      <Button
        onPress={() => {props.onDelete(props.id)}}
        type="clear"
        icon={
          <Ionicons
            name="ios-close-circle-outline"
            size={24}
            color="#AA2A3A"
            style={styles.ionicons}
          />
        }
        

      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginVertical: 10,
    height: 100,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent:'space-between',
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    backgroundColor:'#A0BBA5',
  },
  titleContainer: {
    flex: 1,
    marginTop:15,
    marginLeft: 10,
   
  },
  title: {
    fontWeight: "bold",
    color: "#FFF",
    textAlign:'left',
    
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 5,
    marginVertical:5,
  },
  ionicons:{
    alignItems:'flex-end',
  }
});
