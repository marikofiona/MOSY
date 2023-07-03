import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default GridTile = props => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => props.onClick(props.id)}
    >
      <Text style={styles.gridText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 15,
    padding: 15,
    height: 100,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10
  },
  gridText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right'
  }
});
