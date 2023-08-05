import { faker } from "@faker-js/faker";
import { Person } from "./Person";

export function generatePersons(n: number): Person[] {
  const r: Person[] = [];
  for (let i = 0; i < n; i++) {
    r.push({
      check: Math.random() < 0.5,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: Math.floor(Math.random() * 100),
      rating: ['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)],
      comment1: faker.commerce.productDescription(),
      comment2: faker.commerce.productDescription(),
    });
  }
  return r;
}
