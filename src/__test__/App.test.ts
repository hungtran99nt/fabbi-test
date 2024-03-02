import App from '../App.vue'
import { describe, it, expect, test } from 'vitest'

describe('App', () => {
  it('renders RouterView component', async () => {
    const wrapper = mount(App)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
