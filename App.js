import { StatusBar } from 'expo-status-bar';
import MainMenu from './src/screens/mainMenu';
import GameInfo from './src/screens/gameInfo';
import Cart from './src/screens/cart';
import PaymentScreen from './src/screens/paymentScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CartProvider } from './src/context/cartContext';
import RegisterScreen from './src/screens/register';
import LoginScreen from './src/screens/login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51QAiyrHJvexuiPAUh3pXrY7BKMJDfeAa0xnVYDDt6n9s9fSEtAM0ljYMNqiR89g8fbS69QIX17MNUikmX4LnOHGS00lWnWIxOQ">
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="RegisterScreen">
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ title: 'RegisterScreen', headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ title: 'RegisterScreen', headerShown: false }}
            />
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
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ title: 'Cart', headerShown: false }}
            />
            <Stack.Screen
              name="PaymentScreen"
              component={PaymentScreen}
              options={{ title: 'Payment', headerShown: false }}
            />
          </Stack.Navigator>
          {/* Configuración de la barra de estado */}
          <StatusBar style="light" backgroundColor="#1A2A3D" />
        </NavigationContainer>
      </CartProvider>
    </StripeProvider>
  );
}
