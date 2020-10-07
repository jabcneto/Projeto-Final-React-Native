import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {FlatList} from 'react-native-gesture-handler';

import api from '../../api/api';
import CardFuncionario from '../../components/CardFuncionario';

export default ({navigation}) => {
  const [funcionarios, setFuncionarios] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchApi = async () => {
        try {
          const res = await api.get('/funcionario');
          setFuncionarios(res.data);
          Realm.open({schema: [FuncionarioSchema]}).then((realm) => {
            realm.objects('Funcionario');
          });
        } catch {
          (e) => {
            Realm.open({schema: [FuncionarioSchema]}).then((realm) => {
              console.warn(realm.objects('Funcionario'));
              setFuncionarios(realm.objects('Funcionario'));
            });
            console.log(e);
          };
        }
      };
      fetchApi();
    }, []),
  );

  return (
    <FlatList
      data={funcionarios}
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
