import React from 'react';
import CardFuncionario from './CardFuncionario';

export default ({item, navigation, funcionarios, filterText}) => {
  const funcionariosList = funcionarios
    .filter((funcionario) => {
      return funcionario.nome
        .toLowerCase()
        .startsWith(filterText.toLowerCase());
    })
    .map((funcionario) => {
      return <CardFuncionario item={item} />;
    });

  return <>{funcionariosList}</>;
};
