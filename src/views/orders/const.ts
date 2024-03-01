import type { DefaultOptionType } from 'ant-design-vue/es/select'
import type { IStepItem, Meal, Restaurant } from './types'

export enum STEP {
  _1,
  _2,
  _3,
  REVIEW
}

export const MEAL: Record<string, Meal> = {
  BREAKFIRST: 'breakfirst',
  DINNER: 'dinner',
  LUNCH: 'lunch'
}
export const mealOptions: DefaultOptionType[] = [
  {
    label: 'Breakfirst',
    value: MEAL.BREAKFIRST
  },
  {
    label: 'Dinner',
    value: MEAL.DINNER
  },
  {
    label: 'Lunch',
    value: MEAL.LUNCH
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
    subTitle: 'Meal, number of people'
  },
  {
    title: 'Step 2',
    subTitle: 'Restaurant'
  },
  {
    title: 'Step 3',
    subTitle: 'Dish, no of servings'
  },
  {
    title: 'Review'
  }
]
