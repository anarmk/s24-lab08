import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  function mostRecentStatus (cardStatus: CardStatus): boolean {
    const results = cardStatus.getResults()
    const a = results.length - 1
    return results[a]
  }
  // function mostRecentFailure (cardStatus: CardStatus): number {
  //   const results = cardStatus.getResults()
  //   return results.lastIndexOf(false)
  // }
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const k = cards.slice()
      const wrong = []
      const correct = []
      // k.sort((a, b) =>
      //   mostRecentFailure(a) > mostRecentFailure(b) ? -1 : (mostRecentFailure(a) < mostRecentFailure(b) ? 1 : 0)
      // )
      for (const card of k) {
        if (mostRecentStatus(card)) {
          correct.push(card)
        } else {
          wrong.unshift(card)
        }
      }
      return wrong.concat(correct)
    }
  }
};

export { newRecentMistakesFirstSorter }
