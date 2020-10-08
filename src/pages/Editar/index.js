import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import api from '../../api/api';

export default ({navigation, route}) => {
  const [nome, setNome] = useState(route.params.nome);
  const [id, setId] = useState(route.params.id);
  const [cpf, setCpf] = useState(route.params.cpf);

  return (
    <>
      <View
        style={{alignItems: 'center', justifyContent: 'center', margin: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Atualizando os dados do funcionario {id}
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
            defaultValue={nome}
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
            defaultValue={cpf}
            editable
            maxLength={40}
          />
        </View>
        <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
          <Button
            mode="contained"
            color="green"
            onPress={() => {
              api
                .put(`/funcionario/${id}`, {nome, cpf})
                .then((res) => {
                  navigation.goBack();
                })
                .catch((e) => {
                  console.log(e);
                  Alert.alert('Sem conexão', 'Tente novamente mais tarde.');
                });
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
    </>
  );
};
