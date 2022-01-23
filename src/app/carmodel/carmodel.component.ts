import { Component, Input, SkipSelf } from '@angular/core';
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
  
  public createArr(): number[] {
    var items: number[] = [];
    for(var i = 1; i <= this.numberOfCars; i++){
      items.push(i);
    }
    return items;
  }
}
