import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { decks, plays } from './src/reducers/index'
import { Root } from 'native-base'
import { Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import Decks from './src/components/Decks'
import NewDeck from './src/components/NewDeck'
import Deck from './src/components/Deck'
import logger from 'redux-logger'
import { combineReducers } from 'redux'
import AddCard from './src/components/AddCard'
import Quiz from './src/components/Quiz'

const store = createStore(combineReducers({ decks, plays }), applyMiddleware(logger))

const Tabs = createMaterialTopTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK'
    }
  }
}, {
    navigationOptions: {
      headerTitle: 'FLASHCARDS'
    }
  })

const StackNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  }
})

const MainNavigator = createAppContainer(StackNavigator)

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false });
  }


  render() {
    const { loading } = this.state
    return (
      <Provider store={store}>
        <Root>
          {loading === false &&
            <MainNavigator />
          }
        </Root>
      </Provider>
    );
  }
}