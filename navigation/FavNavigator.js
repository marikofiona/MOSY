import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavScreen from '../screens/FavScreen';

const FavStack = createStackNavigator();

export default FavNavigator = () => {
  return (
    <FavStack.Navigator initialRouteName="Favorites" screenOptions={{
      headerStyle: {height: 160},
      headerTitleStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'tomato'
      }
    }}>
      <FavStack.Screen name="FavoritesScreen" component={FavScreen}/>
    </FavStack.Navigator>
  );
};