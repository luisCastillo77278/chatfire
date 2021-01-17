import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path: 'chats', component: ChatComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'chats'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
