import React, { Component } from 'react'

import {
  View,
  Text,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Go'})
  ]
})


const backgroundColors = ['#2980b9', '#d35400', '#16a085', '#2c3e50', '#7f8c8d']
const headerColors = ['#f39c12', '#8e44ad', '#2980b9', '#16a085', '#c0392b']

class GoScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const screenNumber = navigation.state.params ? navigation.state.params.screenNumber : 0
    const headerColor = headerColors[screenNumber % headerColors.length]
    return {
      title: `I am screen ${screenNumber}`,
      headerStyle: {
        backgroundColor: headerColor,
        height: 85,
      },
      headerTitleStyle: {
        color: 'white'
      },
    }
  }

  state = {
    navInProgress: false,
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}

        // Make sure we don't fire off multiple gestures by using
        // a `navInProgress` flag
        if (gestureState.dy > 150 && !this.state.navInProgress) {
          // swipe downward detected
          this.setState({ navInProgress: true }, () => {
            this.props.navigation.setParams({ swiped: true })
          })
        }

      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  }

  componentWillReceiveProps(nextProps) {
    const { state: thisNavState } = this.props.navigation
    const { state: nextNavState } = nextProps.navigation

    // Test for the swipe gesture
    if (thisNavState && !thisNavState.params.swiped && nextNavState && nextNavState.params.swiped) {
      this.props.navigation.goBack(null)
    }
  }

  goForward = () => {
    const screenNumber = this.props.navigation.state.params ? this.props.navigation.state.params.screenNumber : 0
    const params = { screenNumber: screenNumber + 1 }
    this.props.navigation.navigate('Go', params)
  }

  reset = () => {
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { navigation } = this.props
    const screenNumber = navigation.state.params ? navigation.state.params.screenNumber : 0
    const backgroundColor = backgroundColors[screenNumber % backgroundColors.length]
    return (
      <View style={[styles.container, { backgroundColor }]} {...this._panResponder.panHandlers}>
        <Text style={styles.jumbo}>{screenNumber}</Text>
        <TouchableOpacity onPress={this.goForward}><Text style={styles.textButton}>GO FORWARD!</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.reset}><Text style={styles.textButton}>RESET!</Text></TouchableOpacity>
      </View>
    )
  }
}

export default GoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#2980b9'
  },
  textButton: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    padding: 15
  },
  jumbo: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    padding: 15,
  }
})
