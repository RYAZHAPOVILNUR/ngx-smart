import { Component } from '@angular/core';
import {createState} from "./ngx-smart";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly state = createState({
    user: {
      address: {
        city: 'New York'
      }
    }
  })

  private readonly city$ = this.state.select('user.address.city')
  private readonly cityByFn$ = this.state.select(state => state.user.address.city)
  title = 'ngx-smart';

  constructor() {
    this.city$.subscribe(console.log)
    this.cityByFn$.subscribe(console.log)
  }

}
