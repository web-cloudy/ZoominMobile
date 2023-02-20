import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Background from '../../components/Background'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { theme } from '../../core/theme'
import StoreCard from '../../components/StoreCard'
import StyleCard from '../../components/StyledCard'

export default function Reward() {
  const [status, setStatus] = useState({ value: 'store' })
  return (
    <Background type="main">
      <Header label="Redeem" icon={require('../../assets/reward.png')} />
      <View style={styles.contain}>
        <Button
          labelStyle={{ color: theme.colors.white }}
          mode={status.value === 'store' ? 'contained' : 'outlined'}
          style={
            status.value === 'store' ? styles.selectedButton : styles.button
          }
          onPress={() => {
            setStatus({ value: 'store' })
          }}
        >
          Store
        </Button>
        <Button
          labelStyle={{ color: theme.colors.white }}
          mode={status.value === 'reward' ? 'contained' : 'outlined'}
          style={
            status.value === 'reward' ? styles.selectedButton : styles.button
          }
          onPress={() => setStatus({ value: 'reward' })}
        >
          Reward
        </Button>
      </View>

      {status.value === 'store' ? (
        <View style={styles.preview}>
          <StoreCard
            label="Television"
            val="12"
            url={require('../../assets/storeicons/television.png')}
          />
          <StoreCard
            label="Sneakers"
            val="20"
            url={require('../../assets/storeicons/sneakers.png')}
          />
          <StoreCard
            label="Speakers"
            val="14"
            url={require('../../assets/storeicons/speakers.png')}
          />
          <StoreCard
            label="Apparel"
            val="28"
            url={require('../../assets/storeicons/apparel.png')}
          />
          <StoreCard
            label="Gadgets"
            val="12"
            url={require('../../assets/storeicons/gadgets.png')}
          />
          <StoreCard
            label="Restaurant Vouchers"
            val="20"
            url={require('../../assets/storeicons/vouchers.png')}
          />
        </View>
      ) : status.value === 'reward' ? (
        <StyleCard>
          <Text>123123</Text>
        </StyleCard>
      ) : null}
    </Background>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '47%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 16,
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.white,
    borderWidth: 2,
  },
  selectedButton: {
    width: '47%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 16,
    backgroundColor: theme.colors.buttonColor,
    color: theme.colors.white,
    borderWidth: 2,
  },
  contain: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingLeft: 10,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  preview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})