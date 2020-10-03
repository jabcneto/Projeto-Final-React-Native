import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-paper';
import api from '../../api/api';

export default ({navigation}) => {
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [cpf, setCpf] = useState('');

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
          onPress={() => {
            console.log('clicou');
            api
              .post(`/funcionario`, {id: 0, nome: nome, cpf: cpf})
              .then((res) => {
                console.log(res);
                navigation.goBack();
              })
              .catch((e) => console.log(e));
          }}
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
