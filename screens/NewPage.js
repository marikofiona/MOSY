import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import Layout from '../const/Layout';

import Mood from '../const/Mood';

const NewPage = ({ navigation, route }) => {

  const [selectedDate, setSelectedDate] = useState('');
  const { addedItems } = route.params;

  const renderCustomDay = (day) => {
    const isSelected = selectedDate === day.dateString;
    const isCurrentDate = day.dateString === moment().format('YYYY-MM-DD');
    const customContainerStyle = [
      styles.customDayContainer,
      isSelected && styles.selectedDayContainer,
      isCurrentDate && styles.currentDayContainer,
    ];

    if (day.dateString === '2023-06-11') {
      return (
        <TouchableOpacity onPress={() => setSelectedDate(day.dateString)}>
          <View style={customContainerStyle}>
            <Text style={[styles.customDayText, isSelected && styles.selectedDayText, isCurrentDate && styles.currentDayText]}>
              {day.day}
            </Text>
            {isSelected && <Image source={require('../assets/eis.png')} style={styles.customDayImage} />}
          </View>
        </TouchableOpacity>
      );
    }

    if (day.dateString === '2023-06-08') {
      return (
        <TouchableOpacity onPress={() => setSelectedDate(day.dateString)}>
          <View style={customContainerStyle}>
            <Text style={[styles.customDayText, isSelected && styles.selectedDayText, isCurrentDate && styles.currentDayText]}>
              {day.day}
            </Text>
            {isSelected && <Image source={require('../assets/picknick.png')} style={styles.customDayImage} />}
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => setSelectedDate(day.dateString)}>
        <View style={customContainerStyle}>
          <Text style={[styles.customDayText, isSelected && styles.selectedDayText, isCurrentDate && styles.currentDayText]}>
            {day.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const navigateToMainScreen = () => {
    navigation.navigate('MainTabs');
  };
  const renderEmotionImages = (feelingImages) => {
    const rows = 3; // Number of rows for the emotion images
    const columns = 4; // Number of columns for the emotion images
    const imageRows = [];

    for (let i = 0; i < rows; i++) {
      const startIndex = i * columns; // Starting index of images for the current row
      const endIndex = (i + 1) * columns; // Ending index of images for the current row
      const rowImages = feelingImages.slice(startIndex, endIndex); // Get the images for the current row

      const row = (
        <View key={i} style={styles.emotionRow}>
          {rowImages.map((feelingImage, index) => (
            <View key={index} style={styles.emotionImageContainer}>
              <Image source={feelingImage} style={styles.emotionImage} />
            </View>
          ))}
        </View>
      );

      imageRows.push(row);
    }

    return imageRows;
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={{
            [selectedDate]: { selected: true, marked: false, selectedColor: 'white' },
            [moment().format('YYYY-MM-DD')]: { selected: true, marked: false, selectedColor: 'gray' },
          }}
          renderHeader={(date) => (
            <View>
              <Text style={styles.calendarHeaderText}>{date.toString('MMMM yyyy')}</Text>
            </View>
          )}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          renderDay={renderCustomDay}
          theme={{
            calendarBackground: '#A0BBA5',
            textSectionTitleColor: 'white',
            selectedDayBackgroundColor: 'black',
            selectedDayTextColor: 'black',
            todayTextColor: 'black',
            dayTextColor: 'white',
            textDisabledColor: 'gray',
            arrowColor: 'white',
            monthTextColor: 'white',
          }}
        />
      </View>
      <View style={{ alignSelf: 'left', marginTop: 20 }}>
        <Text style={Layout.textES}>
          Heute habe ich erlebt...
        </Text>
      </View>
      <View style={[styles.schriftContainer, { marginTop: 25 }]}>
        <View style={styles.addedItemsContainer}>
          {addedItems.map((addedItem, index) => {
            console.log('Image Path:', addedItem.activity.image, addedItem.feelingImages); // Debug-Ausgabe des Bildpfads

            if (selectedDate === '' || selectedDate === moment().format('YYYY-MM-DD')) {
              // Display the added items for the current selected date or if no date is selected
              return (
                <View key={index}>
                  <Text style={styles.calendarItemText}>{addedItem.activity.title} & deine Emotionen:</Text>
                  <View style={styles.calenderItems}>
                    <Image source={addedItem.activity.image} style={styles.activityImage} />
                    <View style={styles.emotionImagesContainer}>
                      {renderEmotionImages(addedItem.feelingImages)}
                    </View>
                  </View>
                </View>
              );
            }

            return null; // Don't render anything if the selected date doesn't match
          })}
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={navigateToMainScreen}>
        <AntDesign name="plus" size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    justifyContent: 'flex-start',
    height: '40%',
    width: '85%',
    marginTop: 70,
  },
  container: {
    flex: 1,
    backgroundColor: '#A0BBA5',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  schriftContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
    height: 160,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  image: {
    alignItems: 'center',
    width: 80,
    height: 80,
  },
  customDayContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  customDayImage: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  calendarHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    marginTop: 40,
    position: 'absolute',
    bottom: 20,
    width: 45,
    height: 45,
    backgroundColor: '#75B0B6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  activityImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    marginRight: 10,
  },
  emotionImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  emotionRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  emotionImageContainer: {
    // width: '25%',
    alignItems: 'center',
    margin: 2,
  },
  emotionImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  addedItemsContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  calendarItemText: {
    alignSelf: 'flex-start',
    position: 'relative',
    fontWeight: '500',
    marginBottom: 5,
  },
  calenderItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewPage;
