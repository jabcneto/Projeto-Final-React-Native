import React, {useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';

import {Button} from 'react-native-paper';
import api from '../api/api';

export default ({item, navigation, funcionarios, setFuncionarios}) => {
  const {id, nome, cpf} = item;

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
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#a8adb5',
        margin: 10,
        backgroundColor: '#E5E5E5',
      }}>
      <View
        style={{
          margin: 10,
          alignItems: 'center',
        }}>
        <Image
          style={{width: 200, height: 200, borderRadius: 30}}
          source={{
            uri:
              'https://pbs.twimg.com/profile_images/1290019927131328514/daIq34Sw_400x400.jpg',
          }}
        />
        <View style={{width: '100%'}}>
          <View style={{marginVertical: 15}}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'left',
              }}>
              Matricula: {id.toString()}
            </Text>
            <Text style={{fontSize: 20}}>Nome: {nome}</Text>
            <Text style={{fontSize: 20}}>CPF: {cpf}</Text>
          </View>
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
            style={{marginHorizontal: 10, backgroundColor: '#14213D'}}>
            <Text style={{color: '#FCA311'}}>Editar</Text>
          </Button>
          <View>
            <Button
              mode="contained"
              color="red"
              onPress={async () => {
                await api
                  .delete(`/funcionario/${id}`)
                  .then(() => {
                    alert(
                      'Funcionario com id ' + id + ' removido com sucesso.',
                    );
                    setFuncionarios(
                      funcionarios.filter((element) => {
                        return (
                          element !==
                          funcionarios.find(
                            (funcionario) => funcionario.id === id,
                          )
                        );
                      }),
                    );
                    limparRealm();
                    populaRealm(funcionarios);
                    Realm.open({schema: [FuncionarioSchema]})
                      .then((realm) => {
                        realm.write(() => {
                          const funcionarios = realm.objects('Funcionario');
                          console.log(funcionarios);
                        });
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch((e) => {
                    console.log(e);
                    Alert.alert('Sem conexão', 'Tente novamente mais tarde.');
                  });
              }}
              style={{marginHorizontal: 10, backgroundColor: '#FCA311'}}>
              <Text style={{color: '#14213D'}}>Deletar</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
