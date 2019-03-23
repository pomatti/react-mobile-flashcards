import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import { Header, Content, Root, Container } from 'native-base'
import { Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
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
      <Provider store={createStore(reducer)}>
        <Root>
          {loading === false && (
            <Container>
              <Header />
              <Content>
                <DeckList />
              </Content></Container>)}
        </Root>
      </Provider>
    );
  }
}