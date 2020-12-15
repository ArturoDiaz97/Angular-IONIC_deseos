import { ListaITem } from './lista-item.model';


export class Lista {
    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    terminada: boolean;
    items: ListaITem[];
    constructor(title: string) {
        this.titulo = title;

        this.creadaEn = new Date();
        this.terminada = false;
        this.items = [];

        this.id = new Date().getTime();
    }
}


