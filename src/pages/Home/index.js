import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../api/api';

export default ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      const fetchApi = async () => {
        try {
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
        console.log(error);
      });
  };

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableHighlight
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#14213D',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Funcionários')}>
          <Text
            style={{
              fontSize: 40,
              color: '#FCA311',
              fontWeight: 'bold',
            }}>
            GERENCIAR{'  '}
            <Icon name={'users'} size={40} color="#FCA311" />
          </Text>
        </TouchableHighlight>
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableHighlight
          underlayColor="#E5E5E5"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#FCA311',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Novo')}>
          <Text
            style={{
              fontSize: 40,
              color: '#14213D',
              fontWeight: 'bold',
            }}>
            NOVO{'  '}
            <Icon name={'user'} size={40} color="#14213D" />
          </Text>
        </TouchableHighlight>
      </View>
    </>
  );
};
