import { Component } from '@angular/core';


/**
 * Generated class for the HttpCompComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'http-comp',
  templateUrl: 'http-comp.html'
})
export class HttpCompComponent {

  text: string;

  constructor() {
    console.log('Hello HttpCompComponent Component');
    this.text = 'Hello World';

  }







}
