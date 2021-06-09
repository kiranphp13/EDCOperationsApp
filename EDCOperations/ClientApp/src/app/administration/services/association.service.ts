import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class AssociationService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/association');
  }

  getById(id: string) {
    return this.http.get(baseUrl + '/association/' + id );
  }

  create(params: any) {
    return this.http.post(baseUrl + '/association', params);
  }

  update(id: string, params: any) {
    return this.http.put(baseUrl + '/association/' + id, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
