import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "sort",
  pure: false
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any[], field: string, reverse: boolean): any[] {

    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return reverse ? array.reverse() : array;
  }
}
