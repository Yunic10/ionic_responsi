import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Http } from '@capacitor-community/http';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'token-saya';
const USERNAME = 'namasaya';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;
  constructor(
    public _apiService: ApiService,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private route: Router
  ) { }
  ngOnInit() {
  }
  login() {
    if (this.username != '' && this.password != '') {
      let data = {
        username: this.username,
        password: this.password
      }
      this._apiService.login(data, 'login.php').subscribe({
        next: (res: any) => {
          if (res) {
            if (res) {
              this.setUserId(res);
              this.route.navigate(['/keuangan']);
            } else {
              alert("Gagal login");
            }
          } else {
            alert("Gagal login");
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  goRegister() {
    this.route.navigate(['/register']);
  }

  setUserId = async (id: any) => {
    await Preferences.set({
      key: 'userID',
      value: id,
    });
  };
}