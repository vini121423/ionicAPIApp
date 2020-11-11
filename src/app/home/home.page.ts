import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public usersList: any = [];
  public page = 1;
  public totalPages = 1;

  constructor(private userService: UserService, public alertController: AlertController, public toastController: ToastController) { }

  ionViewWillEnter() {
    this.findUsers(1);
  }

  public findUsers(page: number) {
    if (page <= 0) {
      page = 1;
    }

    this.page = page;

    this.userService.readAll(page).subscribe(dados => {
      this.usersList = dados['data'];
      this.totalPages = dados['total_pages']
    })

  }

  public deletar(id: number) {
    this.userService.deletar(id);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuário excluido com sucesso!',
      duration: 5000
    });
    toast.present();
  }

  async confirmar(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Deseja excluir esse usuário? Ação não pode ser desfeita',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.deletar(id);
            this.presentToast();
          }
        }
      ]
    });

    await alert.present();
  }

}
