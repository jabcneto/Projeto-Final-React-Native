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
    <View style={{backgroundColor: '#14213D', height: '100%'}}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', margin: 15}}>
        <Text style={{color: '#FCA311', fontSize: 20, fontWeight: 'bold'}}>
          Atualizando os dados do funcionário {id}
        </Text>

        <View style={{width: '80%', marginVertical: 15}}>
          <Text style={{color: '#FCA311', fontSize: 20}}>Nome</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              fontSize: 18,
              textAlignVertical: 'center',
              padding: 0,
              color: '#E5E5E5',
              borderBottomColor: '#FCA311',
            }}
            onChangeText={(nome) => setNome(nome)}
            defaultValue={nome}
            editable
            maxLength={40}
          />
        </View>
        <View style={{width: '80%', marginVertical: 15}}>
          <Text
            style={{
              color: '#FCA311',
              fontSize: 20,
            }}>
            CPF
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              fontSize: 18,
              textAlignVertical: 'center',
              padding: 0,
              color: '#E5E5E5',
              borderBottomColor: '#FCA311',
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
            style={{marginHorizontal: 10}}
            color="#FCA311">
            <Text style={{color: '#14213D'}}>Salvar</Text>
          </Button>
          <View>
            <Button
              mode="contained"
              onPress={() => navigation.goBack()}
              color={'#FCA311'}
              style={{marginHorizontal: 10}}>
              <Text style={{color: '#14213D'}}>Cancelar</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
