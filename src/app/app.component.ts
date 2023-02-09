import { Component } from '@angular/core';
import { NotificacaoEnum } from 'src/app/enum/notificacao.enum';
import { AuthService } from './auth.service';
import { NotificacaoService } from './services/notificacao.service';

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
}
