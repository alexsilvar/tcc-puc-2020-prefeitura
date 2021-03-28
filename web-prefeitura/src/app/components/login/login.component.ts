import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  redirected: boolean = false;
  signup = false;
  isLoading = false;
  errorMessage: string = null;

  loginGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  signupGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private router: Router, private authService: AuthService) {
    if (this != null && this != undefined) {
      let data = this.router.getCurrentNavigation()?.extras.state;
      if (data) {
        this.redirected = data['redirected']
      }
    }
  }

  ngOnInit(): void {

  }

  login() {
    if (this.loginGroup.valid) {
      this.isLoading = true;
      this.authService.login({ email: this.loginGroup.get('email')?.value, password: this.loginGroup.get('password')?.value }).then(res => {
        if (this.authService.getUser().role == 'cidadao') {
          throw new Error("Role inválida");
        }
        this.isLoading = false;
        this.router.navigate(['']);
      }).catch(err => {
        this.isLoading = false;
        this.errorMessage = "Falha no login - Apenas Funcionários e Administradores podem conectar";
      })
    } else {
      alert("Informe email e senha")
    }
  }

  switchLoginSignup() {
    this.signup = !this.signup;
  }

  signupSubmit() {
    if (this.signupGroup.get('password')?.value != this.signupGroup.get('password2')?.value) {
      alert("A senha e a confirmação precisam ser iguais");
    }
    if (this.signupGroup.valid) {
      this.isLoading = true;
      this.authService.signup({
        username: this.signupGroup.get('username')?.value,
        password: this.signupGroup.get('password')?.value,
        email: this.signupGroup.get('email')?.value
      }).then(res => {
        this.authService.login({
          password: this.signupGroup.get('password')?.value,
          email: this.signupGroup.get('email')?.value
        }).then(resLogin => {
          this.isLoading = false;
        })
      }).catch(err => {
        this.errorMessage = "Falha no Cadastro"
        this.isLoading = false;
      })
    } else {
      alert("Preencha os campos do cadastro")
    }
  }



  closeAlert() {
    this.errorMessage = null;
  }

}
