import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountriesService,
    private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        //Recibe el valor anterior y regresa un nuevo observable
        switchMap( ({ id }) => this.countryService.searchCountryByAlphaCode( id ) ),
      )
      //A lo que se está suscrito es al resultado de llamar searchCountryByAlpha
      .subscribe( countrySubscribe =>{

        if( !countrySubscribe ){
          return this.router.navigateByUrl('')
        }
        return this.country = countrySubscribe
        console.log('Tenemos un país');
        //return;
      });
  }
}
