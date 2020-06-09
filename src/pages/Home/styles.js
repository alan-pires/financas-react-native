import styled from 'styled-components'

export const Background = styled.View`
flex:1;
background-color:#131313;
`

export const Container = styled.View`
margin-left: 20px;
margin-bottom: 25px;
`

export const Nome = styled.Text`
font-size: 18px;
color: #FFF;
font-style: italic;
`

export const Saldo = styled.Text`
margin-top: 5px;
font-size:30px;
color: #fff;
font-weight: bold;
`

export const Title = styled.Text`
margin-left: 10px;
color: #00b94a;
margin-bottom: 10px;
font-size: 16px;
font-style: italic;
`

export const List = styled.FlatList.attrs({
    marginHorizontal: 15
})`
padding-top: 15px;
background-color: #fff;
border-top-left-radius: 15px;
border-top-right-radius: 15px;
margin-left: 8px;
margin-right: 8px;
`
export const Area = styled.View`
flex-direction:row;
margin-left: 15px;
align-items: baseline;
`

