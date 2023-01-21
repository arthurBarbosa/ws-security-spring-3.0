import { JsonPipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { Login } from 'src/app/shared/models/login.model';
import { LoaderService } from 'src/app/shared/spinner/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  storage: Storage;
  credentials: Login = {
    email: "",
    password: ""
  }

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
  }

  login() {
    this.loginService.login(this.formGroup.value).subscribe(response => {
      var token = JSON.parse(response).token;
      this.storage.setItem("token", token)
      this.router.navigate(['home'])
    })
  }
}
