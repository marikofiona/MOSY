import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import EmotionsScreen from '../screens/EmotionsScreen';
import FavScreen from '../screens/FavScreen';
import NewPage from '../screens/NewPage';
import Activity from '../components/Activity';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="NewPage" component={NewPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#63D3E9',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-star' : 'ios-star-outline';
          } else if (route.name === 'Kalendar') {
            iconName = focused ? 'ios-book-sharp' : 'ios-book-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        name="Kalendar"
        component={NewPage}
        initialParams={{ addedItems: [] }} />
      <Tab.Screen
        name="Favorites"
        options={{ title: 'Meine Favoriten' }}
        component={FavScreen}
      // initialParams={{ favoriteActivities: [...favoriteActivities, favoriteActivities] }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={EmotionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Activity"
        component={Activity}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
