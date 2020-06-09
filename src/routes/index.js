import React,{useContext} from 'react'
import { AuthContext} from '../Contexts/auth'
import {View, ActivityIndicator} from 'react-native'

import AuthRotes from './auth.routes'
import AppRoutes from './app.routes'

function Routes() {
    const {signed, loading} = useContext(AuthContext)

    if(loading){
      return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#131313" />
        </View>
      )
    }

    return (
      signed ? <AppRoutes/> : <AuthRotes /> 
    )
}

export default Routes
