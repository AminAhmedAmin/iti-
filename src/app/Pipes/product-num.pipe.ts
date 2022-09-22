import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productNum'
})
export class ProductNumPipe implements PipeTransform {

  transform(value: any[], num: number): any[] {
    var result: any[] = value.slice(0, num);
    return result;
  }

}
