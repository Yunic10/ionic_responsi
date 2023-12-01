import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class ApiService {
constructor(public http: HttpClient) { }
apiURL() {
return 'http://localhost:70/keuangan';
}

login(data: any, endpoint: string) {
return this.http.post(this.apiURL() + '/' + endpoint, data);
}

register(data: any, endpoint: string) {
return this.http.post(this.apiURL() + '/' + endpoint, data);
}

tambah(data: any, endpoint: string) {
return this.http.post(this.apiURL() + '/' + endpoint, data);
}
edit(data: any, endpoint: string) {
return this.http.put(this.apiURL() + '/' + endpoint, data);
}
tampil(data: any, endpoint: string): Observable<any> {
return this.http.post(this.apiURL() + '/' + endpoint, data);
}
hapus(id: any, endpoint: string) {
console.log(id);
return this.http.delete(this.apiURL() + '/' + endpoint + '' + id);
}
lihat(id: any, endpoint: string) {
return this.http.get(this.apiURL() + '/' + endpoint + '' + id);
}
}