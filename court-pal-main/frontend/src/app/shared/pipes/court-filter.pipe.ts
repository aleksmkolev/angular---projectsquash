import { Pipe, PipeTransform } from '@angular/core';
import { Court } from '../../types/court';

@Pipe({
  name: 'courtFilter',
  standalone: true
})
export class CourtFilterPipe implements PipeTransform {
  transform(courts: Court[], searchName: string, searchSymbol: string): Court[] {
    if (!searchName && !searchSymbol) return courts;
    
    return courts.filter(court => {
      const matchName = court.name.toLowerCase().includes(searchName.toLowerCase());
      const matchSymbol = court.symbol.toLowerCase().includes(searchSymbol.toLowerCase());
      return matchName && matchSymbol;
    });
  }
} 