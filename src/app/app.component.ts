import { LoginService } from './services/login.service';
import { Component } from '@angular/core';
import { NotificacaoEnum } from 'src/app/enum/notificacao.enum';
import { AuthService } from './auth.service';
import { NotificacaoService } from './services/notificacao.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'atendimento-balada';
  showFiller = false;
  indexExpanded: number = -1;

  constructor(
    private auth: AuthService,
    private shared: SharedService,
    private notificacao: NotificacaoService
  ) { }

  hasLoggin() {
    return this.auth.hasLoggin();
  }

  logout() {
    this.notificacao.exibirMensagem(NotificacaoEnum.SUCCESS, 'Sessão finalizada com sucesso!');
    this.auth.logout();
  }

  togglePanels(index: number) {
    this.indexExpanded = index;
  }

  checkPermissionMenu(permissions: string[]): boolean {
    let hasPermission = false;

    permissions.forEach(permission => {
      if (this.shared.roles.includes(permission)) hasPermission = true;
      return;
    })

    return hasPermission;
  }

}
