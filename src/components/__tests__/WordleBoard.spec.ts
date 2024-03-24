import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {VICTORY_MESSAGE, ERROR_MESSAGE} from '../../settings'

describe('WordleBoard', () => {
  let wordOfTheDay = "TESTS"
  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay }})
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue(wordOfTheDay)
    await guessInput.trigger("keydown.enter")
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test("a defeat message appears if user makes incorrect guess", async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay }})
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue("PIZZA")
    await guessInput.trigger("keydown.enter")
    expect(wrapper.text()).toContain(ERROR_MESSAGE)
  })
  test("no end-of-game message appears if user has not yet made a guess", async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay }})
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(ERROR_MESSAGE)

  })
})
