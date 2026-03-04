import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import {useAuth} from '../context/AuthContext';
import {useColorScheme} from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const {user, loading} = useAuth();
  const scheme = useColorScheme();
  const headerBg = scheme === 'dark' ? '#1b1714' : '#E1D4C1';
  const headerFg = scheme === 'dark' ? '#f3f3f3' : '#2F2A26';

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: headerBg},headerShown:false, headerTintColor: headerFg, headerTitleStyle: {color: headerFg}}}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: headerBg},headerShown:false, headerTintColor: headerFg, headerTitleStyle: {color: headerFg}}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
