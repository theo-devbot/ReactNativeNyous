import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        getToken()
    }, [])

    const getToken = async () => {
        setToken(await AsyncStorage.setItem('@jwt'))
    }

    const Logar = ({ navigation }) => {
        const corpo = {
            email: email,
            senha: senha
        }
        fetch('192.168.1.37/api/Account/login', {
            METHOD: 'POST',
            HEADERS: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(corpo)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status != 404) {
                    alert('Bem vindo')
                    navigation.push('Autenticado')
                    getToken(data.token)
                } else {
                    alert('Email ou senha inválido')
                }
            })
    }

    const Logout = ({ navigation }) => {
        return (
            <View>
                <Text>Deseja realmente sair da aplicação?</Text>
                <Button onPress={() => {
                    AsyncStorage.removeItem('@jwt')
                    navigation.push('Login')
                }}
                    title="Sair"
                ></Button>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Coloque o email"
                onChangeText={text => setEmail(text)}
                defaultValue={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Coloque a senha"
                onChangeText={text => setSenha(text)}
                defaultValue={senha}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={Logar}
            >
                <Text styles={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        padding: 5,
        borderRadius: 6
    },
    button: {
        backgroundColor: 'black',
        width: '90%',
        padding: 10,
        borderRadius: 6,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        color: 'white'
    }

});