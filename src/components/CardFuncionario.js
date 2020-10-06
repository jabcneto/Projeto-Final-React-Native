import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';

import {Button} from 'react-native-paper';
import api from '../api/api';

export default ({item, navigation}) => {
  const {id, nome, cpf} = item;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#a8adb5',
        margin: 10,
        backgroundColor: '#fefefe',
      }}>
      <View
        style={{
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 200, height: 200, borderRadius: 30}}
          source={{
            uri:
              'https://pbs.twimg.com/profile_images/1290019927131328514/daIq34Sw_400x400.jpg',
          }}
        />
        <View style={{marginVertical: 15}}>
          <Text style={{fontSize: 25}}>Matricula: {id.toString()}</Text>
          <Text style={{fontSize: 25}}>Nome: {nome}</Text>
          <Text style={{fontSize: 25}}>CPF: {cpf}</Text>
        </View>
        <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate('Editar', {
                id,
                nome,
                cpf,
              });
            }}
            style={{marginHorizontal: 10}}>
            Editar
          </Button>
          <View>
            <Button
              mode="contained"
              color="red"
              onPress={async () =>
                await api
                  .delete(`/funcionario/${id}`)
                  .then(
                    alert(
                      'Funcionario com id ' + id + ' removido com sucesso.',
                    ),
                  )
                  .catch((e) => console.log(e))
              }
              style={{marginHorizontal: 10}}>
              Deletar
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
