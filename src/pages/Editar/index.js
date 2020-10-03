import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-paper';
import api from '../../api/api';

export default ({navigation, route}) => {
  const [nome, setNome] = useState(route.params.nome);
  const [id, setId] = useState(route.params.id);
  const [cpf, setCpf] = useState(route.params.cpf);
  const atualizou = route.params.atualizou;
  const setAtualizou = route.params.setAtualizou;

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
            onPress={() => {
              api.put(`/funcionario/${id}`, {nome, cpf}).then((res) => {
                setAtualizou(atualizou + 1);
                navigation.goBack();
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
