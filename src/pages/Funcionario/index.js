import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import api from '../../api/api';
import CardFuncionario from '../../components/CardFuncionario';

export default ({navigation}) => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [atualizou, setAtualizou] = useState(0);

  const fetchApi = async () => {
    const data = await api
      .get('/funcionario')
      .then((res) => {
        console.log(res.data);
        setFuncionarios(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log('TENTEI');
    fetchApi();
  }, [atualizou]);

  return (
    <ScrollView style={{flex: 1}}>
      {funcionarios.map((funcionario) => {
        return (
          <CardFuncionario
            key={funcionario.id}
            id={funcionario.id}
            nome={funcionario.nome}
            cpf={funcionario.cpf}
            navigation={navigation}
            atualizou={atualizou}
            setAtualizou={setAtualizou}
          />
        );
      })}
    </ScrollView>
  );
};
