import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Layout from '../const/Layout';
import { MoodexContext } from '../data/MoodexContext';
import { Ionicons } from "@expo/vector-icons";
import { getData, storeData } from '../data/AppStorage';

const Activity = ({ modalVisible, closeModal, selectedFeelings, selectedCompany, navigation, filteredActivities }) => {
  const [moodexData, setMoodexData] = useContext(MoodexContext);

  const [addedItems, setAddedItems] = useState([]);
  const [filteredActivities2, setFilteredActivities2] = useState([]);

  useEffect(() => {
    if (filteredActivities) {
      setFilteredActivities2(filteredActivities);
    }
  }, [filteredActivities]);

  const feelingImages = selectedFeelings.map((feelingId) => {
    const feelingItem = moodexData.feelingItems.find((item) => item.id === feelingId);
    return feelingItem?.image;
  });

  const handleAddActivity = (activity) => {
    const addedActivity = {
      activity: activity,
      selectedFeelings: selectedFeelings,
      selectedCompany: selectedCompany,
      feelingImages: feelingImages,
      feelingTitle: moodexData.feelingItems.find((item) => selectedFeelings.includes(item.id))?.title,
    };
    setAddedItems([...addedItems, addedActivity]);
    navigation.navigate('NewPage', { addedItems: [...addedItems, addedActivity] });
    closeModal();
  };

  const toggleFavorite = async (activity) => {
    const updatedActivities = filteredActivities2.map((item) => {
      if (item.id === activity.id) {
        const updatedActivity = { ...item, isFav: !item.isFav };
        if (updatedActivity.isFav) {
          console.log("Added to favorites:", updatedActivity.title);
          console.log("isFav: ", item.isFav);
        } else {
          console.log("Removed from favorites:", updatedActivity.title, item.isFav);
        }
        return updatedActivity;
      }
      return item;
    });

    setFilteredActivities2(updatedActivities);

    try {
      storeData(updatedActivities);
      console.log("Favoriten erfolgreich gespeichert." + updatedActivities[0].isFav);
    } catch (error) {
      console.log("Fehler beim Speichern der Favoriten:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={Layout.title}>Aktivitäten</Text>
          <View style={styles.swiperContainer}>
            <Swiper
              loop={false}
              showsButtons={true}
              showsPagination={true}
              buttonWrapperStyle={styles.buttonWrapper}
            >
              {filteredActivities2.map((item) => (
                <View key={item.id} style={styles.activityContainer}>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(item)}
                  >
                    <Ionicons
                      name={item.isFav ? "ios-heart-circle-sharp" : "ios-heart-circle-outline"}
                      size={32}
                      color="#DA6961"
                    />
                  </TouchableOpacity>
                  <View style={styles.imageContainer}>
                    <Image style={styles.activityIcon} source={item.image} />
                  </View>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.description}>{item.info}</Text>

                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={Layout.buttonActivity}
                      onPress={() => handleAddActivity(item)}
                    >
                      <Text style={Layout.buttonText}>Hinzufügen</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Swiper>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Activity;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '90%',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  swiperContainer: {
    flex: 1,
    height: '100%',
  },
  buttonWrapper: {
    position: 'absolute',
    top: -200,
    width: '100%'
  },
  favoriteButton: {
    position: 'absolute',
    top: -40,
    right: 5,
    zIndex: 1,
  },
  activityContainer: {
    marginTop: 40,
    height: '85%',
  },
  activityIcon: {
    height: '100%',
    width: '100%',
    padding: 70,
    alignSelf: 'center',
  },
  imageContainer: {
    backgroundColor: '#D2DFD5',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 200,
    width: 250,
    marginBottom: 30,
    shadowOpacity: 0.5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'left',
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 20,
  },
  addedItemsContainer: {
    marginTop: 20,
  },
  addedItemContainer: {
    marginBottom: 10,
  },
  addedItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
