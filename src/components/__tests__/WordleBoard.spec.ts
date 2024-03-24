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
  test("if a word of the day does not have 5 characters, a warning is emitted", async () => {
    console.warn = vi.fn()

    mount(WordleBoard, {props: {wordOfTheDay: "PINT"}})

    expect(console.warn).toHaveBeenCalled()
  })
  test("if a word of the day is not in all uppercase, a warning is emitted", async () => {
    console.warn = vi.fn()
    
    mount(WordleBoard, {props: {wordOfTheDay: "Crane"}})

    expect(console.warn).toHaveBeenCalled()
  })
  test("if a word of the day is not a real word, a warning is emitted", async () => {
    console.warn = vi.fn()

    mount(WordleBoard, {props: {wordOfTheDay: "ASDFE"}})

    expect(console.warn).toHaveBeenCalled()
  })
  test("no warning is emitted if a word of the day meets all of the validation rules",async () => {
    console.warn = vi.fn()

    mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

    expect(console.warn).not.toHaveBeenCalled()
  })
})
