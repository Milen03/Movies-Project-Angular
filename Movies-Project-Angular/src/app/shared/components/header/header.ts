import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected authService = inject(AuthService); 
  private router = inject(Router);

  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;

logout(){
  this.authService.logout().subscribe({
    next:() => {
      this.router.navigate(['/home'])
    },
    error: (err) => {
      console.error('Logout failed', err);
    }
  })
}
    

}
