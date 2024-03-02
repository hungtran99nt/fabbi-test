<template>
  <div>
    <Form layout="vertical" label-align="left" ref="formRef" name="form_append" :model="formState">
      <Space v-for="(dish, index) in formState.dishes" :key="dish.name" align="baseline">
        <FormItem
          label="Please select a dish"
          :name="['dishes', index, 'name']"
          :rules="{
            required: true,
            message: 'Please select a dish',
            trigger: 'change'
          }"
        >
          <Select :options="dishOptions" v-model:value="dish.name" />
        </FormItem>
        <FormItem
          label="Please enter no. of servings"
          :name="['dishes', index, 'numOfServings']"
          :rules="{
            required: true,
            message: 'Please  enter no. of servings'
          }"
        >
          <InputNumber v-model:value="dish.numOfServings" :max="10" :min="1" />
        </FormItem>
        <MinusCircleOutlined @click="remove(dish)" />
      </Space>
      <FormItem>
        <Button type="dashed" block @click="add">
          <PlusOutlined />
          Add
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Button, Form, FormItem, InputNumber, Select, Space, message } from 'ant-design-vue'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue/es/form'
import type { NullableDateType } from 'ant-design-vue/es/vc-picker/interface'
import type { DefaultOptionType } from 'ant-design-vue/es/select'
import { computed, onMounted, reactive, ref, watch } from 'vue'

import * as data from '@/assets/data.json'

import type { IDish, IFormActionsExposed, IOrder, IStep3 } from '../types'

const props = defineProps<{ order: Partial<IOrder> }>()

const formRef = ref<NullableDateType<FormInstance>>()
const formState = reactive<Partial<IStep3>>({ dishes: [{ name: '', numOfServings: 1 }] })

const selectedDish = computed(() => formState.dishes?.map((d) => d.name))

const rawDishOptions = ref<string[]>([])
const dishOptions = computed<DefaultOptionType[]>(() =>
  rawDishOptions.value.map((item) => ({
    label: item,
    value: item,
    disabled: selectedDish.value?.includes(item as string)
  }))
)

const onSubmit = async (): Promise<IStep3> => {
  await formRef.value?.validate()
  const data = formRef.value?.getFieldsValue() as IStep3
  const totalDishes = data.dishes.reduce((pre, cur) => pre + cur.numOfServings, 0)
  if (props.order.numOfPeople && totalDishes < props.order.numOfPeople) {
    message.warn('Please add more')
    return Promise.reject()
  }
  return data
}

const add = () => {
  formState.dishes?.push({
    name: '',
    numOfServings: 1
  })
}

const remove = (dish: Pick<IDish, 'name'> & { numOfServings: number }) => {
  const index = formState.dishes?.indexOf(dish)
  if (index !== -1) {
    formState.dishes?.splice(index || 0, 1)
  }
}

watch(
  () => props.order,
  (curOrder) => {
    const curMeal = curOrder.meal
    const curRestaurant = curOrder.restaurant
    if (curMeal && curRestaurant) {
      const dishes = data.dishes as IDish[]
      const dishs = dishes
        .filter((d) => d.availableMeals.includes(curMeal) && d.restaurant === curRestaurant)
        .map((d) => d.name)
      rawDishOptions.value = [...new Set(dishs)]
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.order && props.order.dishes) {
    props.order.dishes.length > 0 && (formState.dishes = props.order.dishes)
  }
})

defineExpose<IFormActionsExposed>({
  getForm: onSubmit
})
</script>
