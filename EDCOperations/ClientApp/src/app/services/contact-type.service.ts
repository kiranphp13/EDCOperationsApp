import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class ContactTypeService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/contacttype');
  }

  getById(id: string) {
    return this.http.get(baseUrl + '/contacttype/' + id );
  }

  create(params: any) {
    return this.http.post(baseUrl + '/contacttype', params);
  }

  update(id: string, params: any) {
    return this.http.put(baseUrl + '/contacttype/' + id, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
