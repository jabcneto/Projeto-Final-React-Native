import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ({navigation}) => {
  return (
    <>
      <Button
        color="blue"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        mode="contained"
        onPress={() => navigation.navigate('Funcionarios')}>
        <Text style={{fontSize: 40}}>
          Gerenciar{'  '}
          <Icon name={'users'} size={40} color="#fff" />
        </Text>
      </Button>
      <Button
        color="green"
        style={{
          justifyContent: 'center',
          flex: 1,
        }}
        mode="contained"
        onPress={() => navigation.navigate('Novo')}>
        <Text style={{fontSize: 40}}>
          Novo{'  '}
          <Icon name={'user'} size={40} color="#fff" />
        </Text>
      </Button>
    </>
  );
};
