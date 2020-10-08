import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-paper';
import api from '../../api/api';
import Realm from 'realm';
import FuncionarioSchema from '../../schemas/FuncionarioSchema';

export default ({navigation}) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');

  const novofuncionario = async () => {
    const funcionario = api
      .post(`/funcionario`, {id: 0, nome: nome, cpf: cpf})
      .then((res) => {
        navigation.goBack();
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        Alert.alert('Sem conexão', 'Tente novamente mais tarde.');
      });

    Realm.open({schema: [FuncionarioSchema]})
      .then((realm) => {
        realm.write(() => {
          realm.create('Funcionario', funcionario);
        });
        realm.close();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style = {{ backgroundColor: '#FCA311', flex: 1}}>
    <View style={{alignItems: 'center', margin: 15 }}>
      <Text style={{fontSize: 24, fontWeight: 'bold', fontFamily: 'Patua One', color: '#14213D'}}>
        Dados do novo funcionario
      </Text>

      <View style={{width: '80%', marginVertical: 15}}>
        <Text style={{fontSize: 20, color: '#14213D', fontFamily:"Patua One"}}>Nome</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            fontSize: 18,
            textAlignVertical: 'center',
            padding: 0,
            borderBottomColor: '#14213D', 
           
          }}
          onChangeText={(nome) => setNome(nome)}
          editable
          maxLength={40}
        />
      </View>
      <View style={{width: '80%', marginVertical: 15}}>
        <Text style={{fontSize: 20, color: '#14213D', fontFamily:"Patua One"}}>CPF</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            fontSize: 18,
            textAlignVertical: 'center',
            padding: 0,
            borderBottomColor: '#14213D',
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
          style={{marginHorizontal: 10, backgroundColor: '#14213D'}}>
          <Text style={{color: '#FCA311', fontFamily: 'Patua One'}}>Salvar</Text>
        </Button>
        <View>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{marginHorizontal: 10, backgroundColor: '#14213D' }}>
           <Text style={{color: '#FCA311', fontFamily: 'Patua One'}}>Cancelar</Text>
          </Button>
        </View>
      </View>      
    </View>
    </View>
  );
};
