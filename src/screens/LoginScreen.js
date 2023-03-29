import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { store } from '../store'
import { getUserInfo, login } from '../services/apis/user'
import { GET_ATTENDS, GET_EVENTS, SET_TOKEN, USERINFO } from '../store/actions'
import { createAttend, getAttends, getEvents } from '../services/apis/server'

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch()
  // const params = new URLSearchParams(window.location.search)
  // const eventid = params.get('event_id')
  const eventid = 24
  const [email, setEmail] = useState({
    value: 'test@test.com',
    error: '',
  })
  const [password, setPassword] = useState({ value: '123123', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    onLogin()
  }
  const onLogin = async () => {
    try {
      const state = store.getState()
      const data = await login({
        email: email.value,
        password: password.value,
      })
      const { access_token } = data
      dispatch({ type: SET_TOKEN, token: access_token })
      const user_Info = await getUserInfo()
      dispatch({ type: USERINFO, userInfo: user_Info })
      const allEvent = await getEvents()
      dispatch({ type: GET_EVENTS, events: allEvent })
      const allAttend = await getAttends()
      dispatch({ type: GET_ATTENDS, attends: allAttend })

      if (eventid) {
        navigation.navigate('Welcome')
      } else if (navigation.canGoBack()) {
        navigation.navigate('Play')
      } else {
        navigation.navigate('Dashboard')
      }
    } catch (e) {
      console.log({ e })
    }
  }

  const onForgotPass = () => {
    const emailError = emailValidator(email.value)
    if (email.value && !emailError) {
      navigation.navigate('ResetPasswordScreen', { useremail: email.value })
    } else {
      setEmail({ ...email, error: emailError })
    }
  }

  return (
    <Background>
      <Logo />
      <Image source={require('../assets/welcome.png')} style={styles.image} />
      <TextInput
        label="Email*"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        icon={require('../assets/sms-tracking.png')}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        icon={require('../assets/lock.png')}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={onForgotPass}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.text}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    color: theme.colors.white,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.white,
  },
  text: {
    color: theme.colors.white,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.link,
  },
  image: {
    width: '100%',
    height: 40,
    margin: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
})
