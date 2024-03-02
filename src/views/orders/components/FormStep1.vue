<template>
  <div>
    <Form layout="vertical" label-align="left" ref="formRef" :model="formState" :rules="rules">
      <FormItem label="Please select a meal" name="meal">
        <Select :options="mealOptions" v-model:value="formState.meal" />
      </FormItem>
      <FormItem label="Please enter no. of people" name="numOfPeople">
        <InputNumber :max="10" :min="1" v-model:value="formState.numOfPeople" />
      </FormItem>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Form, FormItem, InputNumber, Select } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import type { NullableDateType } from 'ant-design-vue/es/vc-picker/interface'

import { mealOptions } from '../const'
import type { IStep1, IFormActionsExposed, IOrder } from '../types'

const props = defineProps<{ order: Partial<IOrder> }>()

const rules: Record<keyof IStep1, Rule[]> = {
  meal: [{ required: true, message: 'Please select a meal', trigger: 'change' }],
  numOfPeople: [{ required: true, message: 'Please enter no. of people' }]
}

const formRef = ref<NullableDateType<FormInstance>>()
const formState: Partial<IStep1> = reactive({
  meal: undefined,
  numOfPeople: undefined
})

const onSubmit = async (): Promise<IStep1> => {
  await formRef.value?.validate()
  const data = formRef.value?.getFieldsValue() as IStep1
  return data
}

onMounted(() => {
  if (props.order) {
    props.order.meal && (formState.meal = props.order.meal)
    props.order.numOfPeople && (formState.numOfPeople = props.order.numOfPeople)
  }
})

defineExpose<IFormActionsExposed>({
  getForm: onSubmit
})
</script>
