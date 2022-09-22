import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seemore'
})
export class SeemorePipe implements PipeTransform {

  transform(value: string, number: number): string {
    return value.split(' ').slice(0, number).join(' ');
  }

}
