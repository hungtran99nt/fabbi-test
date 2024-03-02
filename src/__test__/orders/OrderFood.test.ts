import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OrderFood from '@/views/orders/OrderFood.vue'
import { STEP } from '@/views/orders/const'

describe('OrderFood.vue', () => {
  it('render step 1', () => {
    const wrapper = mount(OrderFood, {
      data() {
        return {
          current: STEP._1
        }
      }
    })
    expect(wrapper.html()).toContain('Please select a meal')
  })
})
