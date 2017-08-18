import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import EventScreen from './EventScreen'


// Set up some dummy data for us to work with

const users = {
  daniel: { name: 'Daniel' },
  chris: { name: 'Chris' },
  zack: { name: 'Zack' },
  carlo: { name: 'Carlo'}
}

const events = [
  { name: 'Monster Truck Rally',description: 'VROOM', attendees: [users.daniel, users.chris]},
  { name: 'Cat Café',  description: 'MEOW', attendees: [users.carlo, users.daniel, users.zack, users.chris] },
  { name: 'Atomic Pinball', description: 'TILT', attendees: [users.chris, users.zack, users.carlo] },
  { name: 'Breakdancing Museum', description: 'SPIN', attendees: [ users.zack, users.daniel] }
]

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'What to do today?',
    headerStyle: {
      backgroundColor: '#16a085',
      height: 85,
    },
    headerTitleStyle: {
      color: 'white'
    },
    headerTruncatedBackTitle: 'Nah',
  }


  renderEventList(events = []){
    return events.map((event, i) => (
      <TouchableOpacity style={styles.event} key={i} onPress={() => this.props.navigation.navigate('Event', { event })}>
        <Text style={styles.eventText}>{event.name}</Text>
        <Text style={styles.eventText}>{'✌︎ '.repeat(event.attendees.length)}</Text>
      </TouchableOpacity>)
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderEventList(events)}
      </View>
    )
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#9b59b6'
  },
  event: {
    width: '90%',
    padding: 15,
    margin: 15,
    backgroundColor: '#3498db',
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  eventText: {
    color: 'white',
    fontSize: 15,
  },
})
