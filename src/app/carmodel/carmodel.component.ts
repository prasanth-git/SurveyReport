import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'app-carmodel',
  templateUrl: './carmodel.component.html',
  styleUrls: ['./carmodel.component.css'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class CarmodelComponent {

  @Input() numberOfCars : number;
  model= ["BMW","Lambhorghini","Audi"];
  count = 0;

  selectedItems: string;

  createArr() {
    var items: number[] = [];
    for(var i = 1; i <= this.numberOfCars; i++){
      items.push(i);
    }
    return items;
  }
}
