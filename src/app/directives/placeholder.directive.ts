import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
  standalone: true
})
export class PlaceholderDirective {

  constructor(private el:ElementRef) {
    
   }

   @HostListener('error')
  onError() {
    this.el.nativeElement.src = 'assets/placeholder.png'; 
  }

}
