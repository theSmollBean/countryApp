import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncerSubscripiton?: Subscription;
  private debouncer: Subject<string> = new Subject<string> ();

  @Input( )
  public placeholder: string = '';

  @Input( )
  public initialValue: string = '';

  @Output(  )
  public onValue = new EventEmitter<string>();

  @Output( )
  public onDebaunce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime( 300 )
    )
    .subscribe( value => {
      this.onDebaunce.emit(value)
    })
  }

  ngOnDestroy(): void {
    console.log('destruido')
    this.debouncerSubscripiton?.unsubscribe()
  }

  //Necesario para la "lectura" de un evento
  emitValue(value: string): void{
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ){
    this.debouncer.next( searchTerm );
  }
}
