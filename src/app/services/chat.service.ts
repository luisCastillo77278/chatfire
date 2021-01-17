import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Chat } from '../interfaces/mesaje.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import Firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatsCollection!: AngularFirestoreCollection<Chat>;
  chats: Chat[] = [];
  usuario: any = {};

  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {
    this.auth.authState
        .subscribe( (resp) => {

          if (!resp){ return; }

          this.usuario.nombre = resp?.displayName;
          this.usuario.email = resp?.email;
          this.usuario.photo = resp?.photoURL;
          this.usuario.uid = resp?.uid;
          
        });
  }

  login(nombre: string){
    if (nombre === 'google'){
      this.auth.signInWithPopup( new Firebase.auth.GoogleAuthProvider() );
    }
  }

  logout(){
    this.usuario = {};
    this.auth.signOut();
  }

  cargarMensaje(){
    this.chatsCollection = this.afs.collection<Chat>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                        .limit(5) );
    return this.chatsCollection.valueChanges()
                .pipe(
                  map( (mensaje: Chat[]) => {
                    this.chats = [];
                    mensaje.forEach( m => this.chats.unshift(m));
                    return this.chats;
                  })
                );
  }

  agregarMensaje(texto: string){
    const mensaje: Chat = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      photo: this.usuario.photo,
      email: this.usuario.email,
      uid: this.usuario.uid,
      fecha: new Date().getTime(),
    }

    return this.chatsCollection.add(mensaje);

  }

}
