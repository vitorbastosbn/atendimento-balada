import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificacaoEnum } from './../enum/notificacao.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  constructor(private toastr: ToastrService) {}

  exibirMensagem(tipo: NotificacaoEnum, msg: string) {
    switch (tipo) {
      case NotificacaoEnum.SUCCESS:
        this.toastr.success(msg);
        break;

      case NotificacaoEnum.ERROR:
        this.toastr.error(msg);
        break;

      case NotificacaoEnum.INFO:
        this.toastr.info(msg);
        break;

      case NotificacaoEnum.WARNING:
        this.toastr.warning(msg);
        break;

      default:
        break;
    }
  }
}
