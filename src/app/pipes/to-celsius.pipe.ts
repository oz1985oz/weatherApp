import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCelsius'
})
export class ToCelsiusPipe implements PipeTransform {

  transform(value: number, unit?: string): any {
    if(unit === 'C'){
      var tempareature = (value - 32) / 1.8 ;
      return tempareature.toFixed(1);
    }
    return value;
  }

}
