import React from "react";
import { View, FlatList } from "react-native";
import FavTile from "./FavTile";

export default ActivityList = (props) => {

  const deleteHandler = (id) => {
    console.log('delete Activity with id: ' + id );
  };

  const favHandler = (id) => {
    console.log('fav Activity with id: ' + id );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => {
          return (
            <FavTile
              text={itemData.item.title}
              id={itemData.item.id}
              isFav={itemData.item.isFav}
              onDelete={deleteHandler}
              onFav={favHandler}
              image={itemData.item.image}
            />
          );
        }}
        style={{ width: "100%" }}
        contentContainerStyle={{alignItems: 'stretch', padding: 20}}
      />
    </View>
  );
};
