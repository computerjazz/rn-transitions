import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

class EventScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.event.name,

    headerTitleStyle: {
      color: 'white',
    },
    headerBackTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: '#e74c3c',
      height: 85,
    },
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          const event = { ...navigation.state.params.event }
          // Return early if 'Me' is already in the attendee list
          if (event.attendees.some(attendee => attendee.name === 'Me'))
            return

          // Spread contents of current array into new array and add 'me' to the end
          event['attendees'] = [...event.attendees, { name: 'Me' }]

          // passing an object containing 'event' to `navigation.setParams`
          // will set `props.navigation.state.params.event` to this new value,
          // which we access within the render() function to display the list of names
          navigation.setParams({
            event,
          })
        }}
        
        style={{
          height: 45,
          width: 45,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(250, 250, 250, 0.7)',
          borderRadius: 50,
          margin: 5,
          shadowColor: 'black',
          shadowOpacity: 0.5,
          shadowOffset: {
            width: 2,
            height: 2,
          }
        }}
        >
          <Text style= {{ fontSize: 30, color: '#2980b9'}}>
            ✌︎
          </Text>
        </TouchableOpacity>)
  })



  render() {
    const { event } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{event.description}</Text>
        <View style={styles.attendees}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{'Who\'s in?'}</Text>
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
