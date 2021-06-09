import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class CollateralService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/collateral');
  }

  getById(id: string) {
    return this.http.get(baseUrl + '/collateral/' + id );
  }

  create(params: any) {
    return this.http.post(baseUrl + '/collateral', params);
  }

  update(id: string, params: any) {
    return this.http.put(baseUrl + '/collateral/' + id, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
