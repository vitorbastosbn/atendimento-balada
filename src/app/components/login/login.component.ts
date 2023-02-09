import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../services/login.service';
import { NotificacaoService } from './../../services/notificacao.service';

import { Router } from '@angular/router';
import { NotificacaoEnum } from 'src/app/enum/notificacao.enum';
import { AccountCredentials } from 'src/app/models/account-credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loading = false;

  formulario!: FormGroup;
  credenciais!: AccountCredentials;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificacaoService: NotificacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.credenciais = new AccountCredentials();
  }

  login() {
    if (this.formulario.invalid) return;
    this.loading = true;

    this.credenciais.username = this.usuario.value;
    this.credenciais.password = this.senha.value;

    this.loginService.autenticar(this.credenciais).subscribe({
      next: (s: any) => {
        localStorage.setItem('accessToken', s.accessToken);
        localStorage.setItem('refreshToken', s.refreshToken);
        localStorage.setItem('username', s.username);
        localStorage.setItem('fullname', s.fullname);
        this.notificacaoService.exibirMensagem(NotificacaoEnum.SUCCESS, "Bem-vindo! " + s.fullname);
        this.router.navigate(["home"])
      },
      error: (e) => {
        this.loading = false;
        this.notificacaoService.exibirMensagem(NotificacaoEnum.ERROR, "Acesso Negado!");
      }
    });
  }

  get usuario() {
    return this.formulario.get('username')!;
  }

  get senha() {
    return this.formulario.get('password')!;
  }
}
