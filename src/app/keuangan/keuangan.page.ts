import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './keuangan.page.html',
  styleUrls: ['./keuangan.page.scss'],
})
export class KeuanganPage implements OnInit {
  modal_edit: boolean = false;
  dataKeuangan: any = [];
  modal_tambah: boolean = false;
  userID: any;
  id: number | null = null;
  jenis: string = '';
  note: string = '';
  jumlah: number = 0;
  constructor(
    public _apiService: ApiService,
    private modal: ModalController,
    private route: Router
    ) {

  }

  ngOnInit() {
    this.getUserId();
  }

  getUserId = async () => {
    const { value } = await Preferences.get({ key: 'userID' });
  
    if (value == null) {
      this.route.navigate(['/login']);
    } else {
      this.userID = value;
      this.getKeuangan();
    }
  };
  
  logout = async () => {
    await Preferences.remove({ key: 'userID' });
    this.route.navigate(['/login']);
  };

  getKeuangan() {
    let data = {
      id_user: this.userID
    }
    this._apiService.tampil(data, 'tampilKeuangan.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataKeuangan = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    })
  }

  reset_model() {
    this.id = null;
    this.jenis = '';
    this.note = '';
    this.jumlah = 0;
  }
  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
  }
  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilKeuangan(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }
  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  tambahKeuangan() {
    if (this.jenis != '' && this.note != '' && this.jumlah != 0) {
      let data = {
        jenis: this.jenis,
        note: this.note,
        jumlah: this.jumlah,
        id_user: this.userID
      }
      this._apiService.tambah(data, '/tambahKeuangan.php')
        .subscribe({
          next: (hasil: any) => {
            this.reset_model();
            console.log('berhasil tambah catatan');
            this.getKeuangan();
            this.modal_tambah = false;
            this.modal.dismiss();
          },
          error: (err: any) => {
            console.log('gagal tambah catatan');
          }
        })
    } else {
      console.log('gagal tambah catatan karena masih ada data yg kosong');
    }
  }

  hapusKeuangan(id: any) {
    this._apiService.hapus(id,
      '/hapusKeuangan.php?id=').subscribe({
        next: (res: any) => {
          console.log('sukses', res);
          this.getKeuangan();
          console.log('berhasil hapus catatan');
        },
        error: (error: any) => {
          console.log('gagal');
        }
      })
  }

  ambilKeuangan(id: any) {
    this._apiService.lihat(id,
      '/lihatKeuangan.php?id=').subscribe({
        next: (hasil: any) => {
          console.log('sukses', hasil);
          let keuangan = hasil;
          this.id = keuangan.id;
          this.jenis = keuangan.jenis;
          this.note = keuangan.note;
          this.jumlah = keuangan.jumlah;
        },
        error: (error: any) => {
          console.log('gagal ambil catatan');
        }
      })
  }
  editKeuangan() {
    let data = {
      id: this.id,
      jenis: this.jenis,
      note: this.note,
      jumlah: this.jumlah
    }
    this._apiService.edit(data, '/editKeuangan.php')
      .subscribe({
        next: (hasil: any) => {
          console.log(hasil);
          this.reset_model();
          this.getKeuangan();
          console.log('berhasil edit catatan');
          this.modal_edit = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal edit catatan');
        }
      })
  }




}