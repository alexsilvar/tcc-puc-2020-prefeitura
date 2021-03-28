import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  isLoading: boolean = false;

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
        this.isLoading = false;
        this.router.navigate(['consulta-iptu']);
      }).catch(err => {
        this.isLoading = false;
        alert("Usuário ou senha inválidos")
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
        email: this.signupGroup.get('email')?.value,
        cpfcnpj: this.signupGroup.get('cpf')?.value
      }).then(res => {
        this.authService.login({
          password: this.signupGroup.get('password')?.value,
          email: this.signupGroup.get('email')?.value
        }).finally(() => {
          this.isLoading = false;
          this.router.navigate([''])
        })
      })
    } else {
      alert("Preencha os campos do cadastro")
    }
  }
}
