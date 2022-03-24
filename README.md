# Typescript implementation of Creational Design Patterns (Gang of Four) examples

The code is all in `src`.
First install the dependencies with `npm i`, then run the scripts:
```
ts-node src/basic.ts
ts-node src/factory.ts
ts-node src/abstractFactory.ts
ts-node src/builder.ts
```
# Nomenclature
We, the `client`, call a `creator` that uses `parts` to create `products`.

## Basic
basic is the stupid/naive implementation where the creator calls parts directly.
```
client -> creator (PRODUCT BUILT HERE) -> parts
```

## Factory Method
Factory method is the simplest smart method.
```
client -> concrete creator (PRODUCT BUILT HERE) -> concrete parts
```

## Abstract Factory
Abstract factory is useful when there already exists a bunch of factories for different concrete products.
```
client -> creator (PRODUCT BUILT HERE) -> concrete factory -> concrete parts
```

## Builder
Builder is similar in architecture to abstract factory, but actually very very different. The biggest different is that the product is created INSIDE the builder, and not inside the creator.
```
client -> director -> concrete builder (PRODUCT BUILT HERE) -> concrete parts
```

# References
- https://en.wikipedia.org/wiki/Design_Patterns#Creational
- https://refactoring.guru/design-patterns/creational-patterns

