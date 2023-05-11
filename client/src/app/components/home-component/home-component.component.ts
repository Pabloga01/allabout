import { Component } from '@angular/core';

@Component({
    selector: 'home-component',
    templateUrl: './home-component.component.html'

})

export class HomeComponent2 {
    public title!: string;
    public comment!: string;
    public year!: number;



    constructor() {
        this.title = 'Titulo de la pantalla home';
        this.comment = 'Subtitulo de la pantalla home';
        this.year = 2023;
        console.log('component working')
    }
}