import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../pages/Home';
import Funcionario from '../../pages/Funcionario';
import Editar from '../../pages/Editar';
import Novo from '../../pages/Novo';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Funcionários"
        component={Funcionario}
        options={{
          headerTintColor: '#FCA311',
          headerTitleStyle: {
            color: '#FCA311',
          },
          headerStyle: {
            backgroundColor: '#14213D',
            borderBottomColor: '#FCA311',
          },
        }}
      />
      <Stack.Screen
        name="Editar"
        component={Editar}
        options={{
          headerTintColor: '#FCA311',
          headerTitleStyle: {
            color: '#FCA311',
          },
          headerStyle: {
            backgroundColor: '#14213D',
            borderBottomColor: '#FCA311',
          },
        }}
      />
      <Stack.Screen
        name="Novo"
        component={Novo}
        options={{
          headerTintColor: '#FCA311',
          headerTitleStyle: {
            color: '#FCA311',
          },
          headerStyle: {
            backgroundColor: '#14213D',
            borderBottomColor: '#FCA311',
          },
        }}
      />
    </Stack.Navigator>
  );
};
