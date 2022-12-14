# NgxSmart

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Какие проблемы будет решать?
Управление стейтом компонента (пока только для компонентов)

## В чем преимущества?
Очень простой и удобный api

## Идеи для api

```typescript
import {createState} from "./create-state";
import {InjectionToken} from "@angular/core";

const initialState = {
  accordeon: {title: "test", open: false},
  cart: {
    price: 10,
    currency: "$",
    count: 2,
    selectedIds: ["1", "2", "3"]
  }
}

class Component {
  private readonly state = createState(initialState)

  private readonly accordeonTitle$ = this.state.select(
    state => state.accordeon.title
  )
  // or
  private readonly accordeonTitle$ =
    this.state.select([
      state => state.accordeon.title,
      state => state.cart.price,
    ])
  // or
  private readonly accordeonTitle$ = this.state.select('accordeon.title')
  // or
  private readonly accordeonTitle$ = this.state.select([
    'accordeon.title',
    'cart.price'
  ])
  // or
  private readonly accordeonTitle$ = this.state.select([
    state => state.accordeon.title,
    'cart.price'
  ])

  private readonly cartPrice$ = rhis.state.select("cart.price")
    .pipe(
      withLatestFrom(
        this.state.select("cart.currency")
      ),
      map(([price, currency]) =>
        price + " " + currency
      )
    )
  // or
  private readonly cartPrice$ = this.state.select([
    "cart.price",
    "cart.currency"
  ]).pipe(
    map(([price, currency]) =>
      price + " " + currency
    )
  )

  constructor() {
    this.state.update({accordeon: {title: "test2"}})
    // or
    this.state.update(
      ["accordeon.title", "test2"],
      ["cart.price", 25],
      ["cart.count", 5]
    )
    // or
    this.state.update(
      ["accordeon.title", "test2"],
      [
        "cart.selectedIds",
        ids => ids.filter(id => id !== "3")
      ],
    )
    //or
    this.state.update(
      state => ({
        ...state,
        cart: {
          ...state.cart,
          count: 5
        }
      })
    )
    // or*
    this.state.update(state => state.cart = "5")

    this.state.update({isAdmin: true})

    this.state.remove("isAdmin")
    // or
    this.state.remove(["isAdmin", "accordeon.open"])

    this.state.clear() // сбрасывает до initialState

    // можно передать коллбек который будет вызываться при изменении любого из полей, если не передать deps то будет вызываться при изменении любого поля
    this.state.onChange(
      () => console.log('deps changed'),
      ['accordeon.open', 'cart.price']
    )
  }

  // подписываться ни на что не нужно, просто вызываешь метод, либа сама под капотом подпишется и отпишется в onDestroy
  private getUser(id: string) {
    this.state.effect(
      () => this.userService.getUser(id)
        .pipe(
          (user: User) => this.state.update({user})
        )
    )
  }
}

const state = createState(initialState);

const cartPrice$ = state.select(
  ["cart.price", "cart.currency"]
).pipe(
  map(([price, currency]) =>
    price + " " + currency
  )
)

const getUser = (id) => state.effect(
  () => this.userService.getUser(id)
    .pipe(
      (user: User) =>
        state.update({user})
    )
)

const facade = {
  cartPrice$,
  getUser,
}

const FACADE = new InjectionToken('facade', { factory: () => facade })
```

