import { dataMealsLetterC } from '../data/Meals/dataMealsLetterC';
import { dataMealsNameChicken } from '../data/Meals/dataMealsNameChicken';
import { dataMealsReturn1Element } from '../data/Meals/dataMealsReturn1Element';
import { dataMealsReturnEmpty } from '../data/Meals/dataMealsReturnEmpty';
import { dataMealsIngredientsChicken } from '../data/Meals/mockMealsIngredientsChicken';

export const mockFetchMealsIngredients = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsIngredientsChicken),
});

export const mockFetchMealsName = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsNameChicken),
});

export const mockFetchMealsLetter = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsLetterC),
});

export const mockFetchMealsReturnEmpty = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsReturnEmpty),
});

export const mockFetchMealsReturn1Element = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsReturn1Element),
});