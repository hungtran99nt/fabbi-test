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

  const clearOrder = (listOfKey: (keyof IOrder)[] = []) => {
    if (listOfKey.length === 0) order.value = {}
    const curOrder = order.value
    listOfKey.forEach((k) => delete curOrder[k])
    order.value = { ...curOrder }
  }

  return { order, assignOrder, clearOrder }
}
