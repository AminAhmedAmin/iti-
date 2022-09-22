import { Pipe, PipeTransform } from '@angular/core';
import { count } from 'rxjs';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(value: any): any {

    return value.length;
  }
}
