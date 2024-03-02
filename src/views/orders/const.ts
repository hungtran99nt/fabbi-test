import type { DefaultOptionType } from 'ant-design-vue/es/select'
import type { IStepItem, Meal, Restaurant } from './types'

export enum STEP {
  _1,
  _2,
  _3,
  REVIEW
}

export const MEAL: Record<string, Meal> = {
  BREAKFAST: 'breakfast',
  DINNER: 'dinner',
  LUNCH: 'lunch'
}
export const mealOptions: DefaultOptionType[] = [
  {
    label: 'Breakfast',
    value: MEAL.BREAKFAST
  },
  {
    label: 'Lunch',
    value: MEAL.LUNCH
  },
  {
    label: 'Dinner',
    value: MEAL.DINNER
  }
]

export const RESTAURANT: Record<string, Restaurant> = {
  BBQ_HUT: 'BBQ Hut',
  MC_DONALDS: 'Mc Donalds',
  OLIVE_GARDEN: 'Olive Garden',
  PANDA_EXPRESS: 'Panda Express',
  PIZZERIA: 'Pizzeria',
  TACO_BELL: 'Taco Bell',
  VEGE_DELI: 'Vege Deli'
}

export const stepItems: IStepItem[] = [
  {
    title: 'Step 1',
    subTitle: 'Meal, no. of people'
  },
  {
    title: 'Step 2',
    subTitle: 'Restaurant'
  },
  {
    title: 'Step 3',
    subTitle: 'Dish, no. of servings'
  },
  {
    title: 'Review'
  }
]
