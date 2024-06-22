import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  isAdmin: boolean = false;
  cartQuantity: number = 0;
  userName: string | null = null;
  private cartSubscription: Subscription | undefined;

  constructor(private productService: ProductService,private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUserName();
    this.checkAdminPermission();
    this.cartSubscription = this.productService.cart$.subscribe(cart => {
      this.cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('sesionUsuario') !== null;
  }

  loadUserName(): void {
    const sesionUsuario = localStorage.getItem('sesionUsuario');
    if (sesionUsuario) {
      const userData = JSON.parse(sesionUsuario);
      this.userName = userData.nombre;
    }
  }

  checkAdminPermission(): void {
    const sesionUsuario = localStorage.getItem('sesionUsuario');
    if (sesionUsuario) {
      const userData = JSON.parse(sesionUsuario);
      if (userData.permisos === 'admin') {
        this.isAdmin = true;
      }
    }
  }


  logout(): void {
    localStorage.removeItem('sesionUsuario');
    this.router.navigate(['/login']).then(() => {
      this.cdr.detectChanges(); // Forzar detección de cambios
    });
  }
}