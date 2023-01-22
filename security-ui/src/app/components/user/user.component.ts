import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formGroup: FormGroup;
  storage: Storage

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.storage = window.localStorage;
    this.formGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.registerUser(this.formGroup.value).subscribe(response => {
      var token = JSON.parse(response).token;
      console.log(token)
      this.storage.setItem("token", token)
    })

  }

}
