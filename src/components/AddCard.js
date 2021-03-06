import React, { Component } from 'react';
import { Container, Button, Item, Input, Text, Form, Content } from 'native-base'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import * as Api from '../utils/api'
import { StyleSheet } from 'react-native'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }
  submit = () => {
    const { deck, dispatch, goBack } = this.props
    deck.cards = deck.cards.concat(this.state)
    Api.submitDeck(deck)
      .then(dispatch(addCard(deck)))
    goBack()
  }
  render() {
    const { question, answer } = this.state
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Text>What is the question?</Text>
            </Item>
            <Item regular>
              <Input
                onChangeText={(value) => this.setState({ question: value })}
                placeholder='Question'
                value={question}
              />
            </Item>
            <Text>What is the answer?</Text>
            <Item last regular>
              <Input
                onChangeText={(value) => this.setState({ answer: value })}
                placeholder='Answer'
                value={answer}
              />
            </Item>
            <Button onPress={this.submit}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
})
function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId],
    goBack: () => navigation.goBack()
  }
}
export default connect(mapStateToProps)(AddCard);