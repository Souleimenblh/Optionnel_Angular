import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Avion } from '../model/avion.model';
import { TypeAv } from '../model/TypeAv.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeAvWrapper } from '../model/TypeAvWrapped.model';
//import { apiURL } from '../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AvionService {
  apiURL: string = 'http://localhost:8085/avions/api';
  apiURLTyp: string = 'http://localhost:8085/avions/typ';

  avions!: Avion[];
  //  avions: Avion[];

  // types: Type[];

  constructor(private http: HttpClient, private authService: AuthService) {}
  // listeAvions(): Avion[] {
  //   return this.avions;
  // }

  listeAvion(): Observable<Avion[]> {
    //     let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.get<Avion[]>(this.apiURL+"/all",{headers:httpHeaders});

    // let jwt = this.authService.getToken();
    // jwt = 'Bearer ' + jwt;
    // let httpHeaders = new HttpHeaders({ Authorization: jwt });

    
    return this.http.get<Avion[]>(this.apiURL + '/all');
  }

  // addAvion(avion: Avion) {
  //   // console.log(this.newAvion);
  //   this.avions.push(avion);
  // }

  // ajouterAvion(avio: Avion) {
  //   this.avions.push(avio);
  // }

  ajouterAvion(avio: Avion): Observable<Avion> {
    return this.http.post<Avion>(this.apiURL, avio, httpOptions);
  }

  supprimerAvion(id: number) {
    // const url = `${this.apiURL}/${id}`;
    // return this.http.delete(url, httpOptions);

    const url = `${this.apiURL}/delprod/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  // consulterAvion(id: number): Avion {
  //   return this.avions.find((p) => p.idAvion == id)!;
  // }

  consulterAvion(id: number): Observable<Avion> {
    // const url = `${this.apiURL}/${id}`;
    // return this.http.get<Avion>(url);
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Avion>(url, { headers: httpHeaders });
  }

  trierAvions() {
    this.avions = this.avions.sort((n1, n2) => {
      if (n1.idAvion! > n2.idAvion!) {
        return 1;
      }
      if (n1.idAvion! < n2.idAvion!) {
        return -1;
      }
      return 0;
    });
  }

  // consulterType(id: number): Type {
  //   return this.types.find((typ) => typ.idTyp == id)!;
  // }

  // listeTypes(): Observable<TypeAv[]> {
  //   return this.http.get<TypeAv[]>(this.apiURL + '/typ');
  // }

  listeTypes(): Observable<TypeAvWrapper> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<TypeAvWrapper>(this.apiURLTyp, {
      headers: httpHeaders,
    });
  }

  updateAvion(avio: Avion): Observable<Avion> {
    // return this.http.put<Avion>(this.apiURL, avio, httpOptions);
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Avion>(this.apiURL + '/updateprod', avio, {
      headers: httpHeaders,
    });
  }

  //rechercherparType
  // rechercherparTypeAv(idAv: number): Observable<Avion[]> {
  //   const url = `${this.apiURL}/Aviostyp/${idAv}`;
  //   return this.http.get<Avion[]>(url);
  // }

  rechercherparTypeAv(idAv: number): Observable<Avion[]> {
    const url = `${this.apiURL}/aviostyp/${idAv}`;
    return this.http.get<Avion[]>(url);
  }

  rechercherParMatricule(matricule: string): Observable<Avion[]> {
    const url = `${this.apiURL}/aviosByMatricule/${matricule}`;
    return this.http.get<Avion[]>(url);
  }

  ajouterTypeAv(typ: TypeAv): Observable<TypeAv> {
    return this.http.post<TypeAv>(this.apiURLTyp, typ, httpOptions);
  }
}
