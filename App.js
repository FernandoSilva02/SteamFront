import { StatusBar } from 'expo-status-bar';
import MainMenu from './src/screens/mainMenu';
import GameInfo from './src/screens/gameInfo';
import Cart from './src/screens/cart';
import PaymentScreen from './src/screens/paymentScreen';
import Success from './src/screens/success';
import Library from './src/screens/library';
import LibraryInfo from './src/screens/libraryInfo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CartProvider } from './src/context/cartContext';
import RegisterScreen from './src/screens/register';
import LoginScreen from './src/screens/login';
import { Ionicons } from '@expo/vector-icons';

// Stack Navigator
const Stack = createStackNavigator();
// Tab Navigator
const Tab = createBottomTabNavigator();

// Barra de navegación inferior
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#31BCFC',
        tabBarInactiveTintColor: '#D9D9D9',
        tabBarStyle: {
          backgroundColor: '#1A1E29',
        },
      }}
    >
      <Tab.Screen
        name="MainMenuTab"
        component={MainMenu}
        options={{
          title: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LibraryTab"
        component={Library}
        options={{
          title: 'Biblioteca',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={Cart}
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Barra de navegación inferior con solo algunas pestañas
function MyTabsLimited() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '31BCFC',
        tabBarInactiveTintColor: 'D9D9D9',
        tabBarStyle: {
          backgroundColor: '#1A1E29',
        },
      }}
    >
      <Tab.Screen
        name="MainMenu"
        component={MainMenu}
        options={{
          title: 'Main Menu',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          title: 'Library',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
              options={{ title: 'LoginScreen', headerShown: false }}
            />
            {/* Tab Navigator para que se vea la barra inferior en las pantallas principales */}
            <Stack.Screen
              name="MainMenu"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            {/* Aquí se mantiene la barra inferior, pero con un subgrupo de las pestañas */}
            <Stack.Screen
              name="GameInfo"
              component={GameInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentScreen"
              component={PaymentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Success"
              component={Success}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LibraryInfo"
              component={LibraryInfo}
              options={{ headerShown: false }}
            />
            {/* Pestañas solo para MainMenu, Library y Cart */}
            <Stack.Screen
              name="MainTabsLimited"
              component={MyTabsLimited}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style="light" backgroundColor="#1A2A3D" />
        </NavigationContainer>
      </CartProvider>
    </StripeProvider>
  );
}
