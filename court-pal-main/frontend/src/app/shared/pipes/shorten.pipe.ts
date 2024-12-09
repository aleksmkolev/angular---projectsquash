import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, maxLength: number = 50): string {
    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
  }
}