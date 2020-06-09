import React,{useContext} from 'react'
import {AuthContext} from '../../Contexts/auth'
import {Container, Nome, NewLink, NewText, Logout, LogoutText} from './styles'
import {useNavigation} from '@react-navigation/native'
import Header from '../../Components/Header'

function Profile() {

const {user, signOut} = useContext(AuthContext)

const navigation = useNavigation()

    return (
      <Container>
         <Header/>
         <Nome>
            {user && user.nome}
         </Nome>

         <NewLink onPress={()=> navigation.navigate('Registrar') }>
            <NewText> Registrar gastos</NewText>
         </NewLink>

         <Logout onPress={()=> signOut()}>
             <LogoutText>Sair</LogoutText>
         </Logout>
      </Container>
    )
}

export default Profile
