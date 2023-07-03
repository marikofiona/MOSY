import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, FlatList, useColorScheme } from 'react-native';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import Activity from '../components/Activity';
import NewPage from './NewPage';
import Layout from '../const/Layout';
import Mood from '../const/Mood';
import MainScreen from './MainScreen';
import { useNavigation } from '@react-navigation/native';

import { MoodexContext } from '../data/MoodexContext';

const activitiesData = {
    c1: 'Spaziergang im Park',
    c2: 'Musik hören',
    c3: 'Buch lesen',
};

export default function EmotionsScreen() {

    const [moodexData, setMoodexData] = useContext(MoodexContext);

    const [mood, setMood] = useState('');
    const [activity, setActivity] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [showNewPage, setShowNewPage] = useState(false);
    const [filteredFeelingItems, setFilteredFeelingItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFeelings, setSelectedFeelings] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const colorScheme = useColorScheme();
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [addedItems, setAddedItems] = useState([]);




    const handleMoodSelection = (selectedCategoryId) => {
        const selectedCategory = moodexData.categoryItems.find((category) => category.id === selectedCategoryId);
        console.log('Selected Category:', selectedCategoryId);

        setMood(selectedCategoryId);

        showFeelingsItems(selectedCategoryId);
        setSelectedCategory(selectedCategoryId);
        setSelectedFeelings([]);
        setSelectedCompany(null);
    };

    const getMatchingActivity = () => {
        const matchingActivity = moodexData.activityItems.find((activity) => {
            return (
                activity.feelingId.some((feelingId) =>
                    selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feelingId)
                ) && activity.companyId === selectedCompany
            );
        });

        setSelectedActivity(matchingActivity);
    };

    useEffect(() => {
        getMatchingActivity();
    }, [selectedFeelings, selectedCompany]);





    const showFeelingsItems = (selectedPageId) => {
        const feelings = moodexData.feelingItems.filter((feeling) => feeling.page === selectedPageId);
        setFilteredFeelingItems(feelings);
    };

    //Die Funktion handleFeelingSelection wird mit einem feelingId-Parameter aufgerufen.
    const handleFeelingSelection = (feelingId) => {
        const isSelected = selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feelingId);
        //Die INCLUDES-Methode wird verwendet, um zu überprüfen, 
        //ob ein bestimmtes Element in einem Array vorhanden ist. Sie gibt true zurück, wenn das Element gefunden wird, andernfalls false. 

        //Die SOME-Methode wird verwendet, um zu überprüfen, ob mindestens ein Element in einem Array eine bestimmte Bedingung erfüllt. 
        //Sie gibt true zurück, wenn mindestens ein Element die Bedingung erfüllt, andernfalls false. 
        let updatedSelectedFeelings; //später die aktualisierte Liste der ausgewählten Gefühle enthalten 

        if (isSelected) {
            updatedSelectedFeelings = selectedFeelings.filter((selectedFeeling) => selectedFeeling.id !== feelingId);
        } else {
            const feeling = moodexData.feelingItems.find((feeling) => feeling.id === feelingId);
            const updatedFeeling = { id: feeling.id, image: feeling.image };
            updatedSelectedFeelings = [...selectedFeelings, updatedFeeling];
        }

        setSelectedFeelings(updatedSelectedFeelings);
        console.log('Selected Feelings:', updatedSelectedFeelings);

        getMatchingActivity();
    };

    const handleCompanySelection = (companyId) => {
        setSelectedCompany(companyId);
        console.log('Selected Company:', companyId);

        getMatchingActivity();
    };


    const closeModal = () => {
        setModalVisible(false);
    };

    const openNewPage = () => {
        setShowNewPage(true);
    };

    const goBack = () => {
        setShowNewPage(false);
    };

    const openModal = () => {
        getMatchingActivity();
        setModalVisible(true);

    };
    const navigation = useNavigation();





    if (showNewPage) {
        return <NewPage goBack={goBack} addedItems={addedItems} />;
    }

    return (
        <FlatList
            style={Layout.mainContainer}
            data={[{ key: 'mainContainer' }]}
            renderItem={() => (
                <View style={Layout.mainContainer}>
                    <Text style={Layout.titleES}>
                        Hallo ChupChup, {"\n"}wie geht es dir heute?
                    </Text>
                    <View style={Layout.containerTop}>
                        {moodexData.categoryItems.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                onPress={() => handleMoodSelection(category.id)}
                                style={[
                                    Layout.categoryItem,
                                    { opacity: selectedCategory === category.id ? 1 : 0.5 },
                                    { shadowColor: selectedCategory === category.id ? 'lightyellow' : '' },
                                    { shadowOpacity: selectedCategory === category.id ? 0.8 : 0 },
                                    { shadowRadius: selectedCategory === category.id ? 10 : 0 },
                                    { shadowOffset: selectedCategory === category.id ? { width: 0, height: 1 } : { width: 0, height: 0 } },

                                ]}
                            >
                                <Image source={category.image} style={Mood.topEmojiIcons} />
                                <Text style={Layout.feelingText}>{category.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View>
                        <Swiper
                            loop={false}
                            showsPagination={true}
                            index={0}
                            style={Layout.swiperContainer}
                            scrollEnabled={true}
                        >
                            <View style={Layout.transparentEmotionsContainer}>
                                {/* Render the first page of FeelingItems */}
                                {[0, 1, 2, 3].map((rowIndex) => (
                                    <View style={Layout.rowContainer} key={rowIndex}>
                                        {[0, 1, 2, 3].map((columnIndex) => {
                                            const index = rowIndex * 4 + columnIndex;
                                            const feeling = moodexData.feelingItems[index];
                                            return (
                                                <TouchableOpacity
                                                    key={feeling.id}
                                                    onPress={() => handleFeelingSelection(feeling.id)}
                                                    style={[
                                                        Layout.feelingItemGrid,
                                                        {
                                                            opacity: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 1 : 0.5,
                                                            shadowColor: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 'lightyellow' : '',
                                                            shadowOpacity: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 0.85 : 0,
                                                            shadowRadius: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 10 : 0,
                                                            shadowOffset: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id)
                                                                ? { width: 0, height: 1 }
                                                                : { width: 0, height: 0 },
                                                        },
                                                    ]}
                                                >
                                                    <Image source={feeling.image} style={Mood.emojiIcons} />
                                                    <Text style={Layout.feelingText}>{feeling.title}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                ))}
                            </View>



                            <View style={Layout.transparentEmotionsContainer}>
                                {/* Render the first page of FeelingItems */}
                                {[4, 5, 6, 7].map((rowIndex) => (
                                    <View style={Layout.rowContainer} key={rowIndex}>
                                        {[0, 1, 2, 3].map((columnIndex) => {
                                            const index = rowIndex * 4 + columnIndex;
                                            const feeling = moodexData.feelingItems[index];
                                            return (
                                                <TouchableOpacity
                                                    key={feeling.id}
                                                    onPress={() => handleFeelingSelection(feeling.id)}
                                                    style={[
                                                        Layout.feelingItemGrid,
                                                        {
                                                            opacity: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 1 : 0.5,
                                                            shadowColor: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 'lightyellow' : '',
                                                            shadowOpacity: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 0.85 : 0,
                                                            shadowRadius: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 10 : 0,
                                                            shadowOffset: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id)
                                                                ? { width: 0, height: 1 }
                                                                : { width: 0, height: 0 },
                                                        },
                                                    ]}
                                                >
                                                    <Image source={feeling.image} style={Mood.emojiIcons} />
                                                    <Text style={Layout.feelingText}>{feeling.title}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                ))}
                            </View>


                            <View style={Layout.transparentEmotionsContainer}>
                                {/* Render the first page of FeelingItems */}
                                {[8, 9, 10, 11].map((rowIndex) => (
                                    <View style={Layout.rowContainer} key={rowIndex}>
                                        {[0, 1, 2, 3].map((columnIndex) => {
                                            const index = rowIndex * 4 + columnIndex;
                                            const feeling = moodexData.feelingItems[index];
                                            return (
                                                <TouchableOpacity
                                                    key={feeling.id}
                                                    onPress={() => handleFeelingSelection(feeling.id)}
                                                    style={[
                                                        Layout.feelingItemGrid,
                                                        {
                                                            opacity: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 1 : 0.5,
                                                            shadowColor: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 'lightyellow' : '',
                                                            shadowOpacity: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 0.85 : 0,
                                                            shadowRadius: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id) ? 10 : 0,
                                                            shadowOffset: selectedFeelings.some((selectedFeeling) => selectedFeeling.id === feeling.id)
                                                                ? { width: 0, height: 1 }
                                                                : { width: 0, height: 0 },
                                                        },
                                                    ]}
                                                >
                                                    <Image source={feeling.image} style={Mood.emojiIcons} />
                                                    <Text style={Layout.feelingText}>{feeling.title}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                ))}
                            </View>

                        </Swiper>
                    </View>


                    <Text style={Layout.textES}>Ich bevorzuge heute...</Text>
                    <View style={Layout.companyContainer}>
                        {moodexData.companyItems.map((company) => (
                            <TouchableOpacity
                                key={company.id}
                                onPress={() => handleCompanySelection(company.id)}
                                style={[
                                    Layout.categoryItem,
                                    { opacity: selectedCompany === company.id ? 1 : 0.5 },
                                    { shadowColor: selectedCompany === company.id ? 'lightyellow' : '' },
                                    { shadowOpacity: selectedCompany === company.id ? 0.85 : 0 },
                                    { shadowRadius: selectedCompany === company.id ? 10 : 0 },
                                    { shadowOffset: selectedCompany === company.id ? { width: 0, height: 1 } : { width: 0, height: 0 } },
                                ]}
                            >
                                <Image source={company.image} style={Mood.companyEmojiIcons} />
                                <Text style={Layout.feelingText}>{company.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={Layout.textES}>Das heutige Wetter:</Text>
                    <MainScreen />
                    <TouchableOpacity style={Layout.button} onPress={openModal}>
                        <Text style={Layout.buttonText}>Fertig</Text>
                    </TouchableOpacity>
                    <Modal
                        isVisible={modalVisible}
                        swipeDirection='down'
                        onSwipeComplete={closeModal}
                        animationType='slide'
                    >
                        <View style={styles.modalContainer}>
                            <Activity closeModal={closeModal} activity={selectedActivity}
                                selectedFeelings={selectedFeelings}
                                selectedCompany={selectedCompany}
                                addedItems={addedItems}
                                navigation={navigation} // Pass the navigation prop here
                                navigate={navigation.navigate} />

                        </View>

                    </Modal>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});