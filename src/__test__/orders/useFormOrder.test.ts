import { describe, expect, it } from 'vitest'

import { MEAL } from '@/views/orders/const'
import { useFormOrder } from '@/views/orders/useFormOrder'

describe('useFormOrder.ts', () => {
  const { order, assignOrder } = useFormOrder()
  it('assign when empty', () => {
    assignOrder({ meal: MEAL.BREAKFAST })
    expect(order).toEqual({ meal: MEAL.BREAKFAST })
  })
})
