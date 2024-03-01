<template>
   <div>
      Order food
      <Steps :current="current" :items="stepItems"></Steps>

      <div class="steps-content">
         {{ stepItems[current].subTitle }}
      </div>
      <div class="steps-action">
         <Button v-if="current < stepItems.length - 1" type="primary" @click="next">Next</Button>
         <Button v-if="current == stepItems.length - 1" type="primary" @click="message.success('Processing complete!')">
            Done
         </Button>
         <Button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</Button>
      </div>

      <FormStep1 />
      <FormStep2 />
      <FormStep3 />
   </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Steps, Button, message } from 'ant-design-vue'

import FormStep1 from './components/FormStep1.vue'
import FormStep2 from './components/FormStep2.vue'
import FormStep3 from './components/FormStep3.vue'

import { stepItems } from './const'

const current = ref<number>(0)
const next = () => {
   current.value++
}
const prev = () => {
   current.value--
}

</script>
<style scoped>
.steps-content {
   margin-top: 16px;
   border: 1px dashed #e9e9e9;
   border-radius: 6px;
   background-color: #fafafa;
   min-height: 200px;
   text-align: center;
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
