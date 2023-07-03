import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { MoodexContext } from '../data/MoodexContext';
import { Ionicons } from '@expo/vector-icons';

const FavScreen = ({ feelingImages }) => {
  const [moodexData] = useContext(MoodexContext);
  const [favorites, setFavorites] = useState(moodexData.favoriteActivities);

  const toggleFavorite = (activityId) => {
    const updatedFavorites = favorites.map((item) => {
      if (item.id === activityId) {
        return {
          ...item,
          isFavorite: !item.isFavorite,
        };
      }
      return item;
    });
    setFavorites(updatedFavorites);
  };

  const renderFavorite = ({ item }) => {
    const matchingFeelings = moodexData.feelingItems.filter((feeling) =>
      item.feelingId.includes(feeling.id)
    );

    return (
      <View style={styles.favoriteContainer}>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
          {item.isFavorite ? (
            <Ionicons name="heart" size={24} color="white" />
          ) : (
            <Ionicons name="heart-outline" size={24} color="white" />
          )}
        </TouchableOpacity>
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.favoriteTitle}>{item.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={item.image} style={styles.activityImages} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
            {matchingFeelings.map((feeling, index) => (
              <View key={index} style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image source={feeling.image} style={styles.feelingImages} />
                <Text style={styles.feelingTitle}>{feeling.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoriten:</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default FavScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DFF0EF',
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'Futura',
    color: '#75B0B6',
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  favoriteContainer: {
    flexDirection: 'column',
    height: 120,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    backgroundColor: '#A0BBA5',
    shadowOpacity: 0.25,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    justifyContent: 'space-around',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Futura',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  feelingImages: {
    height: 27,
    width: 27,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  feelingTitle: {
    fontSize: 10.5,
    fontWeight: 'normal',
    fontFamily: 'Futura',
    color: '#306050',
    textAlign: 'center',
  },
  activityImages: {
    height: 50,
    width: 50,
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 10,
    marginLeft: 15,
    backgroundColor: '#AFC3AF',
  },
});
