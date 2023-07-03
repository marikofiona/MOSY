import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Layout from '../const/Layout';
import { ActivityItems } from '../data/dummyData';
import Swiper from 'react-native-swiper';

const Activity = ({ modalVisible, closeModal, selectedFeelings, selectedCompany }) => {
  const [addedItems, setAddedItems] = useState([]);

  const handleAddActivity = (activity) => {
    const addedActivity = {
      activity: activity,
      selectedFeelings: selectedFeelings,
      selectedCompany: selectedCompany,
    };
    console.log(addedActivity);
    setAddedItems([...addedItems, addedActivity]);
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
          <Swiper
            style={styles.swiperContainer}

            showsPagination={false}
            loop={false}
          >
            {ActivityItems.map((item) => (
              <View key={item.id} style={styles.activityContainer}>
                <View style={styles.imageContainer}>
                  <Image style={styles.activityIcon} source={item.image} />
                </View>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.description}>{item.info}</Text>
                <TouchableOpacity
                  style={Layout.buttons}
                  onPress={() => handleAddActivity(item)}
                >
                  <Text style={Layout.buttonText}>Hinzufügen</Text>
                </TouchableOpacity>
              </View>
            ))}
          </Swiper>

          {/* Anzeige der hinzugefügten Items */}
          <View style={styles.addedItemsContainer}>
            {addedItems.map((addedItem, index) => (
              <View key={index} style={styles.addedItemContainer}>
                <Text style={styles.addedItemText}>{addedItem.activity.title}</Text>
                <Text>Selected Feeling Items ID: {addedItem.selectedFeelings}</Text>
                <Text>Selected Company Item ID: {addedItem.selectedCompany}</Text>
              </View>
            ))}
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
  },
  activityContainer: {
    marginBottom: 20,
  },
  activityIcon: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  imageContainer: {
    backgroundColor: '#D2DFD5',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 220,
    width: '85%',
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
});
