export interface IStepItem {
  title: string
  subTitle?: string
  description?: string
}

export interface IDish {
  id: number
  name: string
  restaurant: string
  availableMeals: string[]
}

export interface IOrder {
  meal: Meal
  numOfPeople: number
  restaurant: Restaurant
  dishes: Pick<IDish, 'name'> & { numOfServings: number }[]
}
export type IStep1 = Pick<IOrder, 'meal' | 'numOfPeople'>

export type Meal = 'breakfirst' | 'lunch' | 'dinner'
export type Restaurant =
  | 'Mc Donalds'
  | 'Taco Bell'
  | 'BBQ Hut'
  | 'Olive Garden'
  | 'Panda Express'
  | 'Pizzeria'
  | 'Vege Deli'

export interface IFormActionsExposed {
  getForm: () => Promise<Partial<IOrder>>
}
