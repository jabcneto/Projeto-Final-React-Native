import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../api/api';

export default ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      const fetchApi = async () => {
        try {
          console.log('tentando');
          const res = await api.get('/funcionario');
          await limparRealm();
          populaRealm(res.data);
        } catch {
          (e) => console.log(e);
        }
      };
      fetchApi();
    }, []),
  );

  const populaRealm = (funcionarios) => {
    Realm.open({schema: [FuncionarioSchema]}).then((realm) => {
      funcionarios.forEach((funcionario) => {
        realm.write(() => {
          realm.create('Funcionario', {
            id: funcionario.id,
            nome: funcionario.nome,
            cpf: funcionario.cpf,
          });
        });
      });
      realm.close();
    });
  };

  const limparRealm = async () => {
    await Realm.open({schema: [FuncionarioSchema]})
      .then((realm) => {
        realm.write(() => {
          const funcionarios = realm.objects('Funcionario');
          realm.delete(funcionarios);
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  };

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
        <Text style={{fontSize: 40, fontFamily: 'Poppins-Medium'}}>
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
        <Text style={{fontSize: 40, fontFamily: 'Poppins-Medium'}}>
          Novo{'  '}
          <Icon name={'user'} size={40} color="#fff" />
        </Text>
      </Button>
    </>
  );
};
