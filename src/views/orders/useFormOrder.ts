import { reactive } from 'vue'
import type { IOrder } from './types'

export const useFormOrder = () => {
  const order: Partial<IOrder> = reactive({})

  const assignOrder = (tempOrder: Partial<IOrder>) => Object.assign(order, tempOrder)

  const clearOrder = () => Object.assign(order, {})

  return { order, assignOrder, clearOrder }
}
