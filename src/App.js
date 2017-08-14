import React, { Component } from 'react'
import {
  Animated,
  Easing
} from 'react-native'
import HomeScreen from './HomeScreen'
import EventScreen from './EventScreen'

import { StackNavigator } from 'react-navigation'

const transitionConfig = () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene, scenes } = sceneProps
    const { index } = scene

    const height = layout.initHeight
    const width = layout.initWidth

    const translateY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [height, 0, 0],
    })

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, 0],
    })

    const opacity = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 1],
    })

    console.log('SCENEProPS', sceneProps)
    if (scenes[sceneProps.index].route.routeName === 'Home') return {  opacity }
    else return { transform: [{  translateY }] }
  },
})

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Event: { screen: EventScreen },
}, {
  initialRouteName: 'Home',
  transitionConfig,
})

export default App
