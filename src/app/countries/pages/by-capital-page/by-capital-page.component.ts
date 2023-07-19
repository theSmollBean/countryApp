import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countriesService: CountriesService ){ }


  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
    console.log('Term:', this.initialValue)
  }

  searchByCapital(term: string): void{
    this.isLoading = true;

    //AQUÍ SE HACE LA "PETICIÓN" PARA OBTENER LOS DATOS
    this.countriesService.searchCapital( term )
      .subscribe( countriesFromService => {
        this.countries = countriesFromService;
        this.isLoading = false;
      });
  }
}
