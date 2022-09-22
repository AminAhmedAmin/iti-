import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], term: string): any[] {
    let result: any[] = value.filter((data) =>
      data.nameEn.toLowerCase().includes(term.toLowerCase()))
    return result;
  }

}


