import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSubCategoryName'
})
export class GetSubCategoryNamePipe implements PipeTransform {

  transform(value: number): any {
    let subCategoryName = ""
    if (value == 1) {
      subCategoryName = "Laptop"
    } else if (value == 2) {
      subCategoryName = "Mobile"
    } else {
      subCategoryName = "Television"
    }
    return subCategoryName
  }
}
