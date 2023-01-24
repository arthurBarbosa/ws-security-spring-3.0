import { animate, state, style, transition, trigger } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { Login } from 'src/app/shared/models/login.model';
import { LoaderService } from 'src/app/shared/spinner/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        backgroundImage: '',
        display: 'none',

        opacity: 0
      })),
      state('visivel', style({
        display: 'visible',
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  estado: string = 'visivel';
  public imagens: any = [
    { estado: 'visivel', url: '/assets/sign_in.svg' },
    { estado: 'escondido', url: '/assets/hello.svg' }
  ]
  formGroup: FormGroup;
  storage: Storage;
  isError: boolean = false;
  public signIn: string = '/assets/sign_in.svg'
  credentials: Login = {
    email: "",
    password: ""
  }
  @Output() showMenu: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loader: LoaderService
  ) {
    this.storage = window.localStorage;

    this.formGroup = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })

  }

  ngOnInit(): void {

    setTimeout(() => this.logicaRotacao(), 3000)
  }

  logicaRotacao(): void {
    console.log(this.imagens)

    // auxilia exibição imagem seguinte
    let idx: number = 0;

    // ocultar imagem
    for (let i: number = 0; i <= 2; i++) {
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido'
        idx = i === 1 ? 0 : i + 1;
        break
      }
    }
    // exibir proxima imagem
    this.imagens[idx].estado = 'visivel';
    setTimeout(() => this.logicaRotacao(), 3000)
  }

  login() {
    this.loginService.login(this.formGroup.value)
      .subscribe(() => {
        this.isError = false;
        this.router.navigate(['home'])
      }, error => {
        this.isError = true;
        throwError(error);
      });

  }
}
