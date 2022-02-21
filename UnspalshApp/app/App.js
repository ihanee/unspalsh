import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ViewPhotoScreen from './screens/ViewPhotoScreen';
const stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{headerShown: false}}>
          <stack.Screen name="SplashScreen" component={SplashScreen} />
          <stack.Screen name="HomeScreen" component={HomeScreen} />
          <stack.Screen name="ViewPhotoScreen" component={ViewPhotoScreen} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
