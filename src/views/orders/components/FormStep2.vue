<template>
  <div>
    <Form layout="vertical" label-align="left" ref="formRef" :model="formState" :rules="rules">
      <FormItem label="Please select a restaurant" name="restaurant">
        <Select :options="restaurantOptions" v-model:value="formState.restaurant" />
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, Select } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import type { NullableDateType } from 'ant-design-vue/es/vc-picker/interface'
import type { DefaultOptionType } from 'ant-design-vue/es/select'
import { onMounted, reactive, ref, watch } from 'vue'

import * as data from '@/assets/data.json'

import type { IDish, IFormActionsExposed, IOrder, IStep2 } from '../types'

const props = defineProps<{ order: Partial<IOrder> }>()

const rules: Record<keyof IStep2, Rule[]> = {
  restaurant: [{ required: true, message: 'Please select a restaurant', trigger: 'change' }]
}

const formRef = ref<NullableDateType<FormInstance>>()
const formState: Partial<IStep2> = reactive({})

const onSubmit = async (): Promise<IStep2> => {
  await formRef.value?.validate()
  const data = formRef.value?.getFieldsValue() as IStep2
  return data
}

const restaurantOptions = ref<DefaultOptionType[]>([])
watch(
  () => props.order,
  (curOrder) => {
    const curMeal = curOrder.meal
    if (curMeal) {
      const dishes = data.dishes as IDish[]
      const restaurants = dishes
        .filter((d) => d.availableMeals.includes(curMeal))
        .map((d) => d.restaurant)

      restaurantOptions.value = [...new Set(restaurants)].map((r) => ({ label: r, value: r }))
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.order) props.order.restaurant && (formState.restaurant = props.order.restaurant)
})

defineExpose<IFormActionsExposed>({
  getForm: onSubmit
})
</script>
