// Test fixture for the mobile-ux-conventions skill.
// A small Expo habit tracker with convention problems planted on purpose.
// It is review material only. Do not use it as a starting point for an app.
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { api } from './api';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ padding: 24 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} />
      <Pressable onPress={() => api.login(email, password).then(() => navigation.replace('Main'))}>
        <Text>Log in</Text>
      </Pressable>
      <Pressable onPress={() => GoogleSignin.signIn().then(() => navigation.replace('Main'))}>
        <Text>Continue with Google</Text>
      </Pressable>
    </View>
  );
}

function HabitsScreen({ navigation }) {
  const [habits, setHabits] = useState([]);
  useEffect(() => { api.habits().then(setHabits); }, []);

  const remove = (id) =>
    Alert.alert('Are you sure?', '', [
      { text: 'Cancel' },
      { text: 'OK', onPress: () => api.remove(id).then(() => setHabits(habits.filter((h) => h.id !== id))) },
    ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 8 }}>
        <Pressable onPress={() => navigation.navigate('NewHabit')} style={{ width: 40, height: 40 }}>
          <Ionicons name="add" size={28} />
        </Pressable>
      </View>
      <FlatList
        data={habits}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 12 }}>
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <Pressable onPress={() => remove(item.id)}>
              <Ionicons name="trash" size={18} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

function NewHabitScreen({ navigation }) {
  const [name, setName] = useState('');
  const save = async () => {
    await api.create(name);
    navigation.goBack();
  };
  return (
    <View style={{ padding: 24 }}>
      <TextInput placeholder="Habit name" value={name} onChangeText={setName} />
      <Pressable onPress={save} style={{ backgroundColor: 'red', padding: 14 }}>
        <Text style={{ color: 'white' }}>Save</Text>
      </Pressable>
    </View>
  );
}

const Placeholder = () => <View />;

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen name="Profile" component={Placeholder} options={{ tabBarIcon: () => <Ionicons name="person" size={24} /> }} />
      <Tabs.Screen name="Stats" component={Placeholder} options={{ tabBarIcon: () => <Ionicons name="bar-chart" size={24} /> }} />
      <Tabs.Screen name="Habits" component={HabitsScreen} options={{ tabBarIcon: () => <Ionicons name="home" size={24} /> }} />
      <Tabs.Screen name="Search" component={Placeholder} options={{ tabBarIcon: () => <Ionicons name="star" size={24} /> }} />
      <Tabs.Screen name="Friends" component={Placeholder} options={{ tabBarIcon: () => <Ionicons name="people" size={24} /> }} />
      <Tabs.Screen name="Settings" component={Placeholder} options={{ tabBarIcon: () => <Ionicons name="settings" size={24} /> }} />
    </Tabs.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
    Location.requestForegroundPermissionsAsync();
    Camera.requestCameraPermissionsAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="NewHabit"
          component={NewHabitScreen}
          options={({ navigation }) => ({
            presentation: 'modal',
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
