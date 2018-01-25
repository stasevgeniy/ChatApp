import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  public messagesCollection: AngularFirestoreCollection<any[]>;
  public  items: Observable<any[]>;
  public username;
  constructor(public afs: AngularFirestore, public navCtrl: NavController, private navParams: NavParams) {
      this.username = navParams.get('name');
  }
    Exit() {
        this.navCtrl.setRoot(HomePage);
    }
    ngOnInit() {
        this.getChatData();
    }

    getChatData() {
        this.messagesCollection = this.afs.collection<any>('chat_messages', ref => ref.orderBy("time", "asc"));
        this.items = this.messagesCollection.valueChanges();
    }
    newMessage(message) {
        if(!message.value.trim())return false;
        let user: any;
        user = Object.assign({}, {
            name: this.username,
            message: message.value.trim(),
            time: Date.now()
        });
        this.messagesCollection.add(user);
        message.value = '';
    }

}
