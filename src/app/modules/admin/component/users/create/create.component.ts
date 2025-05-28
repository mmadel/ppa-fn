import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  hasError: boolean = false
  @Output() changeVisibility = new EventEmitter<string>()
  errorMessage!: string | undefined;
  constructor(private fb: FormBuilder, private userService: UserService,private spinner: NgxSpinnerService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ROLE_USER', Validators.required]
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.spinner.show()
      this.userService.create(this.registerForm.value).subscribe(reuslt => {
        this.spinner.hide();
        this.hasError = false;
        this.errorMessage = undefined;
        this.registerForm.reset();
        this.changeVisibility.emit('close')
      }, error => {
        this.hasError = true;
        this.errorMessage = error.error.error;
      })
    }
    console.log('Form Submitted:', this.registerForm.value);
  }
}
