<template>
  <div>
    Order food
    <Steps :current="current" :items="stepItems"></Steps>

    <div class="steps-content">
      <FormStep1 v-if="current === STEP._1" ref="formRefStep1" :order="order" />
      <FormStep2 v-if="current === STEP._2" ref="formRefStep2" :order="order" />
      <FormStep3 v-if="current === STEP._3" ref="formRefStep3" :order="order" />
      <ReviewStep v-if="current === STEP.REVIEW" :order="order" />
    </div>

    <div class="steps-action">
      <Button v-if="current < stepItems.length - 1" type="primary" @click="next">Next</Button>
      <Button v-if="current == stepItems.length - 1" type="primary" @click="submit">
        Submit
      </Button>
      <Button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button, Steps, message } from 'ant-design-vue'
import type { NullableDateType } from 'ant-design-vue/es/vc-picker/interface'
import { ref, unref } from 'vue'

import FormStep1 from './components/FormStep1.vue'
import FormStep2 from './components/FormStep2.vue'
import FormStep3 from './components/FormStep3.vue'
import ReviewStep from './components/ReviewStep.vue'
import { STEP, stepItems } from './const'
import type { IFormActionsExposed } from './types'
import { useFormOrder } from './useFormOrder'

const formRefStep1 = ref<NullableDateType<IFormActionsExposed>>()
const formRefStep2 = ref<NullableDateType<IFormActionsExposed>>()
const formRefStep3 = ref<NullableDateType<IFormActionsExposed>>()

const { order, assignOrder, clearOrder } = useFormOrder()

const current = ref<STEP>(STEP._1)

const next = async () => {
  const cur = unref(current)

  try {
    switch (cur) {
      case STEP._1: {
        const data = (await formRefStep1.value?.getForm()) || {}
        assignOrder(data)
        current.value++
        return
      }
      case STEP._2: {
        const data = (await formRefStep2.value?.getForm()) || {}
        assignOrder(data)
        current.value++
        return
      }
      case STEP._3: {
        const data = (await formRefStep3.value?.getForm()) || {}
        assignOrder(data)
        current.value++
        return
      }
      case STEP.REVIEW:
        return
      default:
        return
    }
  } catch {
    /* empty */
  }
}

const prev = () => {
  const cur = unref(current)
  switch (cur) {
    case STEP._2: {
      clearOrder(['restaurant'])
      current.value--
      return
    }
    case STEP._3: {
      clearOrder(['dishes'])
      current.value--
      return
    }
    default:
      return
  }
}

const submit = () => {
  message.success('Processing complete!')
  console.log('👀 ====> submit:', order.value)
}
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  /* text-align: center; */
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
