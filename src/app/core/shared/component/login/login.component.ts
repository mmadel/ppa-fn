import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  hidePassword = true;
  hasLoginError: boolean = false
  errorMessage: string | undefined;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    // Get return url from route parameters or default to '/'
  }
  get email() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }
  get f() { return this.loginForm.controls; }
  bothFieldsTouched(): boolean | undefined {
    return this.email?.dirty && this.email?.valid &&
      this.password?.dirty && this.password?.valid;
  }
  onSubmit() {
    console.log('Form submitted'); // Debug log 3
    this.submitted = true;
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('invalid form')
      return;
    }

    this.loading = true; !
      this.spinner.show();
    this.authService.login(this.f['userName'].value, this.f['password'].value)
      .subscribe({
        next: (response) => {
          // Login successful, redirect to returnUrl
          this.hasLoginError = false
          this.errorMessage = undefined
          this.spinner.hide();
          this.router.navigate(['/ppa/dashboard'])
            .then(navSuccess => {
              if (!navSuccess) {
                console.error('Navigation failed, redirecting to fallback');
                this.router.navigate(['/']);
              }
            });

        },
        error: (err) => {
          this.spinner.hide();
          this.hasLoginError = true
          this.errorMessage = err.error.error
          console.error('Login error:', err.error.error);
        }

      });
  }
}
