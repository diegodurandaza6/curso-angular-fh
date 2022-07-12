import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'puedevolar'
})

export class PuedeVolarPipe implements PipeTransform {
    transform(value: boolean): string {
        if (value)
            return 'Vuela';
        else
            return 'No vuela';
    }
}