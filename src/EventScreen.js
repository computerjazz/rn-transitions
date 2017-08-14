import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

class EventScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.event.name,
    headerStyle: {
      backgroundColor: '#e74c3c',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerBackTitleStyle: {
      color: 'white'
    },
  })



  render() {
    const { event } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{event.description}</Text>
        <View style={styles.attendees}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{'Who\'s going?'}</Text>
          {event.attendees.map((person, i) => (<Text style={{fontSize: 15, marginTop: 5}} key={i}>{person.name}</Text>))}
        </View>
      </View>
    )
  }
}

export default EventScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
    backgroundColor: '#3498db'
  },
  attendees: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '75%',
    borderRadius: 5,
    padding: 10,
  },
  name: {
    fontSize: 90,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: '#f1c40f'
  },
  stars: {
    fontSize: 90,
    fontWeight: 'bold',
    color: '#f1c40f'
  }
})
