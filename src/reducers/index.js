import { RETRIEVE_DECKS, ADD_DECK } from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case RETRIEVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: { ...action }
      }
    default:
      return state
  }
}

export default decks