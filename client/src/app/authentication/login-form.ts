import { HttpClient } from "@angular/common/http";
import { Component, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: 'login-form',
    templateUrl: './login-form.html',
    imports: [ReactiveFormsModule]
})
export class LoginForm {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });
    
    formStatus: "Free"|"Occuped" = "Free";
    
    constructor(private http: HttpClient) {
        // 
    }
    
    onSubmit() {
        this.formStatus = 'Occuped';
        
        this.http.post('http://localhost:8080/api/login', {
            username: this.form.get('email')?.value,
            password: this.form.get('password')?.value
        }).subscribe((res) => {
            console.log(res);
        });

        this.formStatus = 'Free';
    }
}