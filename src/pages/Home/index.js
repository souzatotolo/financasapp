import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, View, StatusBar } from 'react-native';
import Header from '../../components/Header'
import { Background, Nome, Saldo, Container, Title, List } from './styles'
import { AuthContext } from '../../contetexts/auth';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';

export default function Home() {

  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(() => {
    async function loadList() {
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico').child(uid).orderByChild('date')
        .limitToLast(10).on('value', (snapshot) => {
          setHistorico([]);
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
            };
            setHistorico(oldArray => [...oldArray, list].reverse())
          });
        });

    }
    loadList();
  }, [])

  return (
    <Background>
      <StatusBar barStyle='light-content' />
      <Header />
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>

      <List
        showVerticalScrollIndicator={false}
        data={historico}
        keyExtract={(item) => item.key}
        renderItem={({ item }) => (
          <HistoricoList data={item} />
        )}
      />
    </Background>
  );
}