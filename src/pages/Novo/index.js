import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-paper';
import api from '../../api/api';
import Realm from 'realm';
import FuncionarioSchema from '../../schemas/FuncionarioSchema';

export default ({navigation}) => {
  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');

  const novofuncionario = async () => {
    const funcionario = api
      .post(`/funcionario`, {nome: nome, cpf: cpf})
      .then((res) => {
        navigation.goBack();
        return res.data;
      })
      .catch((e) => console.log(e));

    Realm.open({schema: [FuncionarioSchema]})
      .then((realm) => {
        console.log('chegou aqui');
        realm.write(() => {
          realm.create('Funcionario', funcionario);
        });
        console.log(realm.objects('Funcionario'));
        realm.close();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{alignItems: 'center', margin: 15}}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>
        Dados do novo funcionario
      </Text>

      <View style={{width: '80%', marginVertical: 15}}>
        <Text style={{fontSize: 20}}>Nome</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            fontSize: 18,
            textAlignVertical: 'center',
            padding: 0,
          }}
          onChangeText={(nome) => setNome(nome)}
          editable
          maxLength={40}
        />
      </View>
      <View style={{width: '80%', marginVertical: 15}}>
        <Text style={{fontSize: 20}}>CPF</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            fontSize: 18,
            textAlignVertical: 'center',
            padding: 0,
          }}
          onChangeText={(cpf) => setCpf(cpf)}
          editable
          maxLength={40}
        />
      </View>
      <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
        <Button
          mode="contained"
          onPress={novofuncionario}
          style={{marginHorizontal: 10}}>
          Salvar
        </Button>
        <View>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{marginHorizontal: 10}}>
            Cancelar
          </Button>
        </View>
      </View>
    </View>
  );
};
