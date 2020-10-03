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
      <Stack.Screen name="Funcionarios" component={Funcionario} />
      <Stack.Screen name="Editar" component={Editar} />
      <Stack.Screen name="Novo" component={Novo} />
    </Stack.Navigator>
  );
};
