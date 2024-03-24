import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {VICTORY_MESSAGE, ERROR_MESSAGE} from '../../settings'

describe('WordleBoard', () => {
  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }})
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue("TESTS")
    await guessInput.trigger("keydown.enter")
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test("a defeat message appears if user makes incorrect guess", async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }})
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue("PIZZA")
    await guessInput.trigger("keydown.enter")
    expect(wrapper.text()).toContain(ERROR_MESSAGE)
  })
  test.todo("no end-of-game message appears if user has not yet made a guess")
})
