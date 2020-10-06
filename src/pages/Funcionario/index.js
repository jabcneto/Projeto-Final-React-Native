import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';

import api from '../../api/api';
import CardFuncionario from '../../components/CardFuncionario';

export default ({navigation}) => {
  const [funcionarios, setFuncionarios] = useState([]);

  const fetchApi = async () => {
    try {
      const res = await api.get('/funcionario');
      setFuncionarios(res.data);
      console.log(res.data);
    } catch {
      (e) => console.log(e);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <FlatList
      data={funcionarios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => {
        return <CardFuncionario item={item} navigation={navigation} />;
      }}
    />
  );
};
