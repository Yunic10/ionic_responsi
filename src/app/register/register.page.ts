import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: any;
  password: any;

  constructor(public _apiService: ApiService, private route: Router) { }

  ngOnInit() {
  }

  goLogin() {
    this.route.navigate(['/login']);
  }

  register() {
    let data = {
      username: this.username,
      password: this.password
    }
    this._apiService.register(data, 'registrasi.php').subscribe({
      next: (res: any) => {
        if (res) {
          if (res) {
            alert("Berhasil registrasi");
            this.route.navigate(['/login']);
          } else {
            alert("Gagal registrasi");
          }
        } else {
          alert("Gagal registrasi");
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
