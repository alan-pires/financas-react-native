import React, { useState, useContext } from 'react'
import {Platform} from 'react-native'
import {Background, Container, AreaInput, Input,
       SubmitButton, SubmitText, Link, LinkText} from '../SignIn/styles'
import {useNavigation} from '@react-navigation/native'
import {AuthContext} from '../../Contexts/auth'

function SignIn() {
    const navigation = useNavigation()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signUp} = useContext(AuthContext)

    function handleSignUp(){
        signUp(email, password, nome)
    }

    return (
        <Background>
            <Container
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
            >

            <AreaInput >
                <Input 
                    placeholder="Email"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />               
            </AreaInput>

            <AreaInput >
                <Input 
                    placeholder="Senha"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                    secureTextEntry={true}
                />               
            </AreaInput>

            <AreaInput >
                <Input 
                    placeholder="Nome"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={nome}
                    onChangeText={(text)=>setNome(text)}
                />               
            </AreaInput>

            <SubmitButton onPress={handleSignUp}>
                <SubmitText>Cadastrar</SubmitText>
            </SubmitButton>

            <Link
            onPress={()=> navigation.goBack()}
            >
                <LinkText>Cancelar</LinkText>
            </Link>

           
            </Container>
        </Background>
    )
}

export default SignIn
