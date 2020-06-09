import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Contexts/auth'
import {TouchableOpacity, Platform} from 'react-native'
import Header from '../../Components/Header'
import HistoricoList from '../../Components/HistoricoList'
import firebase from '../../services/firebaseConnection'
import {format} from 'date-fns'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DatePicker from '../../Components/DatePicker'

import { Background, Container, Nome, Saldo, Title, List, Area } from './styles'

function Home() {
    const [historico, setHistorico] = useState([])
    const [saldo, setSaldo] =useState(0)
    const [newDate, setNewDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false)

    const { user } = useContext(AuthContext)
    const uid = user && user.uid;

    useEffect(()=>{
        async function loadList(){
            await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
                setSaldo(snapshot.val().saldo)
            })

            await firebase.database().ref('historico')
            .child(uid)
            .orderByChild('data').equalTo(format(newDate, 'dd/MM/yy'))
            .limitToLast(10).on('value', (snapshot)=>{
                setHistorico([])
                snapshot.forEach((childItem) =>{
                    let list = {
                        key: childItem.key,
                        tipo: childItem.val().tipo,
                        valor: childItem.val().valor,
                        data: childItem.val().data
                    }
                    setHistorico(oldArray => [...oldArray, list].reverse())
                })
            })
        }
        loadList()
    },[newDate])

    function handleShowPicker(){
        setShowDate(true)
    }

    function handleClose(){
        setShowDate(false)
    }

    function onChange(date){
        setShowDate(Platform.OS === 'ios');
        setNewDate(date)
        console.log(date)
    }

    return (
        <Background>
            <Header />
            <Container>
                <Nome>Olá {user && user.nome}, seu saldo é de:</Nome>
                  <Saldo>R$ {saldo.toFixed(2)}</Saldo>
            </Container>

            <Area>
            <TouchableOpacity onPress={handleShowPicker}>
                <Icon name="event" color="#FFF" size={30} />
            </TouchableOpacity>
            <Title>Ultimas movimentações</Title>
            </Area>

            <List
            showsVerticalScrollIndicator={false}
            data={historico}
            keyExtractor={item =>item.key}
            renderItem={({item})=> ( <HistoricoList data={item} />)}
            />   

            {
                showDate && (
                    <DatePicker
                    onClose={handleClose}
                    date={newDate}
                    onChange={onChange}
                    />
                )
            }  

        </Background>


    )
}

export default Home
