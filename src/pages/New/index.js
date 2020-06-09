import React,{useState, useContext} from 'react'
import {SafeAreaView,Alert, Keyboard, TouchableWithoutFeedback} from 'react-native'
import Header from '../../Components/Header'
import firebase from '../../services/firebaseConnection'
import {format} from 'date-fns'
import {AuthContext} from '../../Contexts/auth'
import {useNavigation} from '@react-navigation/native'
import {Background, Input, SubmitButton, SubmitText} from './styles'
import Picker from '../../Components/Picker'

function New() {
    const navigation = useNavigation()
const [valor, setValor] = useState('')
const [tipo, setTipo]= useState(null);
const {user: usuario} = useContext(AuthContext)

function handleSubmit(){
    Keyboard.dismiss()
    if(isNaN(parseFloat(valor)) || tipo === null){
        alert('Preencha todos os campos!')
        return
    }

    Alert.alert(
        'Confirmação dos dados',
        `Tipo: ${tipo} - Valor: ${parseFloat(valor)}`,
        [
            {
                text: 'Cancelar',
                style:'cancel'
            },
            {
                text: 'Confirmar',
                onPress:()=> handleAdd()
            }
        ]
    )
}

async function handleAdd(){
    let uid = usuario.uid;

    let key = await firebase.database().ref('historico').child(uid).push().key
    await firebase.database().ref('historico').child(uid).child(key).set({
        tipo: tipo,
        valor: parseFloat(valor),
        data: format(new Date(), 'dd/MM/yy')
    })

    //atualizar o saldo
    let user = firebase.database().ref('users').child(uid)
    await user.once('value').then( (snapshot)=>{
        let saldo = parseFloat(snapshot.val().saldo);

        tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo+= parseFloat(valor)

        user.child('saldo').set(saldo)
    })
    Keyboard.dismiss();
    setValor(''); 
    navigation.navigate('Home');
}

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <Background>
          <Header/>

          <SafeAreaView style={{alignItens: 'center'}}>
              <Input 
                placeholder="Valor desejado"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={()=> Keyboard.dismiss()}
                value={valor}
                onChangeText={(text)=> setValor(text)}
             />

            <Picker 
                onChange={setTipo}
            />

              <SubmitButton onPress={handleSubmit}>
                  <SubmitText>Registrar</SubmitText>
              </SubmitButton>

          </SafeAreaView>
      </Background>
      </TouchableWithoutFeedback>
    )
}

export default New
