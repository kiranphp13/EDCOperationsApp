import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class ProspectService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/prospect');
  }

  getById(id: string) {
    return this.http.get(baseUrl + '/prospect/' + id );
  }

  create(params: any) {
    return this.http.post(baseUrl + '/prospect', params);
  }

  update(id: string, params: any) {
    return this.http.put(baseUrl + '/contactcategory/' + id, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  getAgenciesList() {
    return this.http.get(baseUrl + '/agency');
  }

  getStatesList() {
    return this.http.get(baseUrl + '/state');
  }

  getContactTypesList() {
    return this.http.get(baseUrl + '/contacttype');
  }


}
