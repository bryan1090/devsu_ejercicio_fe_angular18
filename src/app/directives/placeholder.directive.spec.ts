import { Component, DebugElement } from "@angular/core";
import { PlaceholderDirective } from "./placeholder.directive";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
  standalone:true,
  template: `<img appPlaceholder src="url" />`,
  imports:[PlaceholderDirective]
})
class TestComponent {}

describe('PlaceholderDirective', () => {
  
  let fixture:ComponentFixture<TestComponent>;
  let imgDebug:DebugElement;

  beforeEach(()=>{
    fixture=TestBed.configureTestingModule({
      imports:[TestComponent],

    }).createComponent(TestComponent);
    fixture.detectChanges();

    imgDebug = fixture.debugElement.query(By.css('img'));

  })



  it('cambiar el atributo src por el placeholder', () => {
    
    imgDebug.triggerEventHandler('error',new Event('error'));
    fixture.detectChanges();
    const src=imgDebug.nativeElement.src;
    expect(src).toBe('http://localhost/assets/placeholder.png');
  });
});
