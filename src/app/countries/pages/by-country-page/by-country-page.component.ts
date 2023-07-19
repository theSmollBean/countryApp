import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = ''

  constructor( private countryService: CountriesService ){}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.initialValue = this.countryService.cacheStore.byCountries.term;
  }

  searchByCountry( country: string ): void{
    this.isLoading = true;
    this.countryService.searchCountry( country )
    .subscribe( countryFromService => {
      this.countries = countryFromService;
      this.isLoading = false;
    });
  }
}
