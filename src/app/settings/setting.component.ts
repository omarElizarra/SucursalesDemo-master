
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const  API_ENDPOINT: string ='';
@Injectable({
  providedIn: 'root'
})
export class AppsettingsComponent {
  API_ENDPOINT= environment.API_ENDPOINT
}
