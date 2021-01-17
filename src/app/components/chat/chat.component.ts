import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/mesaje.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {
  mensaje = '';
  elemento: any;
  constructor(public chatService: ChatService) {

    this.chatService.cargarMensaje()
        .subscribe(() => {
          setTimeout(() => {
            this.elemento.scrollTop = this.elemento.scrollHeight;
          }, 30);

        });
  }

  ngOnInit(): void {
    this.elemento = document.querySelector('#app-mensaje');
  }

  // tslint:disable-next-line: typedef
  enviarMensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0){ return; }

    this.chatService.agregarMensaje( this.mensaje )
        .then( () => {
          console.log('enviado');
          this.mensaje = '';
        })
        .catch( () => console.log('erro en el envio'));

  }

}
