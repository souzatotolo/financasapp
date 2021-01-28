import React from 'react';
import { View } from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import SignIn from './../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
 return (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerShown: false}}
    />

    <AuthStack.Screen
      name="SignUp" 
      component={SignUp}
      options={{headerStyle:{
        backgroundColor: '#181818',
        borderBottomWidth: 1,
        borderBottomColor: '#00b94a',
      },
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitle: 'Voltar',
      headerTitleAlign: 'left'
    }}
    />
  </AuthStack.Navigator>
  
  );
}