import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import MainNavigator from './navigation/MainNavigator';
import { MoodexContext } from './data/MoodexContext';
import { ActivityItems, CategoryItems, CompanyItems, FeelingItems, FavoriteActivities } from './data/dummyData';
import { getData, storeData } from './data/AppStorage';

export default () => {
  const [moodexData, setMoodexData] = useState({ favoriteActivities: FavoriteActivities, activityItems: ActivityItems, categoryItems: CategoryItems, companyItems: CompanyItems, feelingItems: FeelingItems });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      getData()
        .then((favoriteActivities) => {
          const parsedActivities = JSON.parse(favoriteActivities);
          setMoodexData((prevData) => ({ ...prevData, favoriteActivities: parsedActivities }));
          console.log(favoriteActivities);
        })
        .catch((error) => console.log("An error occurred while fetching favorite activities:", error));

    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <MoodexContext.Provider value={[moodexData, setMoodexData]}>
      <MainNavigator />
    </MoodexContext.Provider>
  );
};
