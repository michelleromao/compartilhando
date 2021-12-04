import React from 'react';
import { Container, Content, Title } from './styles';
import { Agua, Aluguel, Energia, Internet,
        FaxinaGeral, Faxinar, Lavar, Limpar, Lixo, Outros  } from '../Icons';

const Category = ({ icon, width, height }) => {
  return(
    <Container>
      <Content>
        {
          icon === "water" ? <Agua width={width} height={height} /> :
          icon === "rent" ? <Aluguel width={width} height={height} /> :
          icon === "energy" ? <Energia width={width} height={height} /> :
          icon === "internet" ? <Internet width={width} height={height} /> :
          icon === "geral" ? <FaxinaGeral width={width} height={height} /> :
          icon === "cleaning" ? <Faxinar width={width} height={height} /> :
          icon === "washing" ? <Lavar width={width} height={height} /> :
          icon === "clean" ? <Limpar width={width} height={height} /> :
          icon === "garbage" ? <Lixo width={width} height={height} /> :
          icon === "other" ? <Outros width={width} height={height} /> : <></>
        }
      </Content>
      <Title>
        {
          icon === "water" ? 'Agua' :
          icon === "rent" ? 'Aluguel' :
          icon === "energy" ? 'Energia' :
          icon === "internet" ? 'Internet'  :
          icon === "geral" ? 'Faxina Geral' :
          icon === "cleaning" ? 'Faxinar' :
          icon === "washing" ? 'Lavar' :
          icon === "clean" ? 'Limpar' :
          icon === "garbage" ? 'Lixo' :
          icon === "other" ? 'Outros' : <></>
          }
      </Title>
    </Container>
  )

}

export default Category;