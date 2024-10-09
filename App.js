import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MainMenu from './src/screens/mainMenu';
import GameInfo from './src/screens/gameInfo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenu} 
          options={{ title: 'Main Menu', headerShown: false }} // Ocultar el header si no es necesario
        />
        <Stack.Screen 
          name="GameInfo" 
          component={GameInfo} 
          options={{ title: 'Game Info' }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}