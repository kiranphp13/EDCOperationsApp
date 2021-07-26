import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class AgencyService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/agency');
  }

  getById(id: string) {
    return this.http.get(baseUrl + '/agency/' + id );
  }

  create(params: any) {
    return this.http.post(baseUrl + '/agency', params);
  }

  update(id: string, params: any) {
    return this.http.put(baseUrl + '/agency/' + id, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
