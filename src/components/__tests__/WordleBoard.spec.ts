import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {VICTORY_MESSAGE, ERROR_MESSAGE, WARNING_MESSAGE} from '../../settings'

describe('WordleBoard', () => {
  let wordOfTheDay = "TESTS"
  let wrapper: ReturnType<typeof mount>;
  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay }})
  })

  async function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue(guess)
    await guessInput.trigger("keydown.enter")
  }

  describe('End of game messaging', () => {
    test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
      await playerSubmitsGuess(wordOfTheDay)
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
  
    test("a defeat message appears if user makes incorrect guess", async () => {
      await playerSubmitsGuess('PIZZA')
      expect(wrapper.text()).toContain(ERROR_MESSAGE)
    })
    test("no end-of-game message appears if user has not yet made a guess", async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(ERROR_MESSAGE)
    })
  })
  describe('Rules for defining word of the day', () => {
    beforeEach(() => {
      console.warn = vi.fn()
    })
    test.each(
      [
        { wordOfTheDay: "PINT", reason: "word of the day must have five characters" },
        { wordOfTheDay: "Crane", reason: "word of the day must be in all caps" },
        { wordOfTheDay: "ASDJE", reason: "word of the day must be a valid English word" },
      ]
    )
    ("Since $reason, $wordOfTheDay is invalid and emits a warning", async ({ wordOfTheDay }) => {  
      mount(WordleBoard, {props: {wordOfTheDay}})
  
      expect(console.warn).toHaveBeenCalled()
    })
    test("no warning is emitted if a word of the day meets all of the validation rules", async () => {
      mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})
  
      expect(console.warn).not.toHaveBeenCalled()
    })
  })
  describe('Rules for player inputs', () => {
    test("player guesses are limited to 5 letters", async () => {
      await playerSubmitsGuess(wordOfTheDay + "EXTRA")
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
    test("player guess can only be submitted if they are real words", async () => {
      await playerSubmitsGuess("VIZZZ")
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(ERROR_MESSAGE)
    })
  })
})