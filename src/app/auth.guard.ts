import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificacaoEnum } from './enum/notificacao.enum';
import { NotificacaoService } from './services/notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private notificacao: NotificacaoService
  ) { }

  canActivate() {
    if (this.auth.hasLoggin()) {
      return true;
    }

    localStorage.clear();
    this.notificacao.exibirMensagem(NotificacaoEnum.WARNING, 'Sua sessão expirou!');
    this.router.navigate(['login']);
    return false;
  }

}
