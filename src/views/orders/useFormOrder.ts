import { ref } from 'vue'
import type { IOrder } from './types'

export const useFormOrder = () => {
  const order = ref<Partial<IOrder>>({})

  const assignOrder = (tempOrder: Partial<IOrder>) => {
    const curOrder = order.value
    order.value = {
      ...curOrder,
      ...tempOrder
    }
  }

  const clearOrder = () => (order.value = {})

  return { order, assignOrder, clearOrder }
}
