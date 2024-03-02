<template>
  <div class="mb-5">
    <Descriptions :column="1" bordered>
      <DescriptionsItem label="Meal">{{
        mealOptions.find((item) => item.value === props.order.meal)?.label
      }}</DescriptionsItem>
      <DescriptionsItem label="No. of People">{{ props.order.numOfPeople }}</DescriptionsItem>
      <DescriptionsItem label="Restaurant">{{ props.order.restaurant }}</DescriptionsItem>
      <DescriptionsItem label="Dishes">
        <Typography>
          <TypographyParagraph v-for="dish in props.order.dishes" :key="dish.name">
            {{ `${dish.name} - ${dish.numOfServings}` }}
          </TypographyParagraph>
        </Typography>
      </DescriptionsItem>
    </Descriptions>
  </div>
</template>
<script setup lang="ts">
import { Descriptions, DescriptionsItem, Typography, TypographyParagraph } from 'ant-design-vue'

import type { IOrder } from '../types'
import { mealOptions } from '../const'

const props = defineProps<{ order: Partial<IOrder> }>()
</script>
