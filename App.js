import { StatusBar } from 'expo-status-bar';
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
          options={{ title: 'Main Menu', headerShown: false }}
        />
        <Stack.Screen
          name="GameInfo"
          component={GameInfo}
          options={{ title: 'Game Info', headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
