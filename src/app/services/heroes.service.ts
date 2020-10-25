import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { HeroeModel } from '../models/heroe.model';
import {map} from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url= 'https://journal-app-78a92.firebaseio.com'


  constructor(private http:HttpClient) { }

  crearHeroe(heroe:HeroeModel){

    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(map((resp:any) =>{
      heroe.id=resp.name;
      return heroe;
    }))
  }

  borrarHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
  
  actualizarHeroe(heroe:HeroeModel){
    // Debo crear una copia del heroe porque debo quitar el componente 'id' para que no se guarde en la BD, y como los objetos se pasan por referencia en JS, no lo puedo hacer directamente en el objeto original ya que estaria perdiendo una propiedad que es necesaria. 
    const heroeTemporal= {...heroe};

    delete heroeTemporal.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemporal)
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(map(resp=> this.crearArreglo(resp)));
  }

  getHeroebyID(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }
  

  private crearArreglo(heroesObj:Object) {
    const heroes : HeroeModel[]= [];

    if (heroesObj === null){return []};

    Object.keys(heroesObj).forEach(key => {
     
      const heroe:HeroeModel=heroesObj[key];
      heroe.id=key;
      heroes.push(heroe);
    });
    return heroes;
    
  }



}
