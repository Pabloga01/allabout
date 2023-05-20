import { Component } from '@angular/core';

@Component({
  selector: 'app-publications-user-list',
  templateUrl: './publications-user-list.component.html',
  styleUrls: ['./publications-user-list.component.scss']
})
export class PublicationsUserListComponent {
  item = { title: 'pub1', description: 'a description' }
  publications = [this.item, this.item, this.item,this.item,this.item]
}
