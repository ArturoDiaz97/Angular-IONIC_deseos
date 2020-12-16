import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              public alertController: AlertController,
              private route: Router) { }

  ngOnInit() {}

  navegarLista(lista: Lista){
    if (this.terminada) {
      this.route.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else{
      this.route.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista){
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'nombreLista',
          value: lista.titulo,
          type: 'text',
          placeholder: 'Placeholder 1'
        }
      ], buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: (name) => {
            this.deseosService.listas.filter(listaData => {
              if (listaData.id === lista.id) {
                listaData.titulo = name.nombreLista;
                this.deseosService.guardarStorage();
                this.lista.closeSlidingItems();
              }
            });
          }
        }
      ]
    });
    alert.present();
  }
}

