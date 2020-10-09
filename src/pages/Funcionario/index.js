import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {FlatList, TextInput} from 'react-native-gesture-handler';

import api from '../../api/api';
import CardFuncionario from '../../components/CardFuncionario';
import {View} from 'react-native';

export default ({navigation}) => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [filterText, setFilterText] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const fetchApi = async () => {
        try {
          const res = await api.get('/funcionario');

          setFuncionarios(res.data);

          Realm.open({schema: [FuncionarioSchema]}).then((realm) => {
            realm.objects('Funcionario');
          });
        } catch (e) {
          Realm.open({schema: [FuncionarioSchema]}).then((realm) => {
            setFuncionarios(realm.objects('Funcionario'));
          });
          console.log(e);
        }
      };
      fetchApi();
    }, []),
  );

  const Filtro = () => {
    const funcionariosFiltrado = funcionarios.filter((funcionario) => {
      return funcionario.nome
        .toLowerCase()
        .startsWith(filterText.toLowerCase());
    });

    return (
      <FlatList
        data={funcionariosFiltrado}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <CardFuncionario
              funcionarios={funcionarios}
              setFuncionarios={setFuncionarios}
              item={item}
              navigation={navigation}
            />
          );
        }}
      />
    );
  };

  return (
    <View style={{backgroundColor: '#14213D', flex: 1}}>
      <TextInput
        style={{
          backgroundColor: '#E5E5E5',
          margin: 10,
          paddingHorizontal: 20,
          fontSize: 18,
          borderWidth: 1,
          borderColor: '#FCA311',
          borderRadius: 20,
          textAlignVertical: 'center',
          color: '#444',
        }}
        onChangeText={(nome) => setFilterText(nome)}
        placeholder="Buscar"
        editable
      />
      <Filtro funcionarios={funcionarios} filterText={filterText} />
    </View>
  );
};
