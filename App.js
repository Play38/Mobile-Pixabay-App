import React, { Component } from 'react'
import ImageApp from './src/ImageApp'
/**
 * Store - holds our state - THERE IS ONLY ONE STATE
 * Action - State can be modified using actions - SIMPLE OBJECTS
 * Dispatcher - Action needs to be sent by someone - known as dispatching an action
 * Reducer - receives the action and modifies the state to give us a new state
 *  - pure functions
 *  - only mandatory argument is the 'type'
 * Subscriber - listens for state change to update the ui
 */

// const store = createStore(reducer)

class App extends Component {
  render () {
    return (
      <ImageApp />
    )
  }
}

export default App

// export default App;
