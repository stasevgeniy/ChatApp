import {Component, Input} from '@angular/core';
import { NavController } from 'ionic-angular';

import {ChatPage} from "../chat/chat";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }
  Enter(username) {
    if(!username.trim()){return false;}
    this.navCtrl.setRoot(ChatPage,{name: username.trim()});
  }

}
