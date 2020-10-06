import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../api/api';

export default ({navigation}) => {
  const [funcionarios, setFuncionarios] = useState([]);

  const limparRealm = async () => {
    Realm.open({schema: [FuncionarioSchema]})
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

  const populaFuncionarios = async () => {
    try {
      const res = await api.get('/funcionario');
      setFuncionarios(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    limparRealm();
    populaFuncionarios();

    funcionarios.forEach((funcionario) => {
      Realm.open({schema: [FuncionarioSchema]}).then((realm) => {
        realm.write(() => {
          realm.create('Funcionario', {
            id: funcionario.id,
            nome: funcionario.nome,
            cpf: funcionario.cpf,
          });
        });
      });
    });

    Realm.open({schema: [FuncionarioSchema]}).then((realm) => {
      console.log(realm.objects('Funcionario'));
    });
  }, []);

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
