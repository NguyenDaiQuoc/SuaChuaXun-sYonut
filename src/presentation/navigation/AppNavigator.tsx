/**
 * App Navigation - Responsive Navigation
 * Drawer/Sidebar for Desktop, Bottom Tabs for Mobile
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, Text } from 'react-native';
import { ProductListScreen } from '../screens/ProductListScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { theme } from '../theme/theme';
import { useCartStore } from '../stores/cartStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const { width } = Dimensions.get('window');
const isDesktop = width >= theme.breakpoints.desktop;

// Stack Navigator for Product Flow
const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
        headerTitleStyle: {
          fontWeight: theme.typography.fontWeight.bold,
        },
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
};

// Cart Badge Component
const CartBadge = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  if (totalItems === 0) return null;
  return (
    <Text
      style={{
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: theme.colors.accent,
        color: theme.colors.surface,
        borderRadius: theme.borderRadius.full,
        paddingHorizontal: 6,
        paddingVertical: 2,
        fontSize: 10,
        fontWeight: theme.typography.fontWeight.bold,
      }}
    >
      {totalItems}
    </Text>
  );
};

// Bottom Tab Navigator for Mobile
const MobileNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.light,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.medium,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProductStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24 }}>{focused ? '🏠' : '🏠'}</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.surface,
          tabBarIcon: ({ focused }) => (
            <>
              <Text style={{ fontSize: 24 }}>{focused ? '🛒' : '🛒'}</Text>
              <CartBadge />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.surface,
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24 }}>{focused ? '💳' : '💳'}</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigator for Desktop
const DesktopNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          width: 250,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text.secondary,
        drawerLabelStyle: {
          fontSize: theme.typography.fontSize.md,
          fontWeight: theme.typography.fontWeight.medium,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={ProductStack}
        options={{
          headerShown: false,
          drawerLabel: '🏠 Home',
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={{
          drawerLabel: '🛒 Cart',
        }}
      />
      <Drawer.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          drawerLabel: '💳 Checkout',
        }}
      />
    </Drawer.Navigator>
  );
};

// Main App Navigator
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      {isDesktop ? <DesktopNavigation /> : <MobileNavigation />}
    </NavigationContainer>
  );
};
