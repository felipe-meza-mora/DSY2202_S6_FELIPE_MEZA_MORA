import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';

declare var bootstrap: any; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private routerSubscription: Subscription | undefined;
  isAdmin: boolean = false;
  cart: { product: Product, quantity: number }[] = [];
  total: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.checkAdmin(); 
    this.loadProducts();

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadProducts();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  private checkAdmin(): void {
    const sesionUsuario = localStorage.getItem('sesionUsuario');
    if (sesionUsuario) {
      const userData = JSON.parse(sesionUsuario);
      this.isAdmin = userData.permisos === 'admin';
    }
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.showToast(`${product.title} ha sido agregado al carrito`);
  }

  private showToast(message: string): void {
    const toastElement = document.getElementById('liveToast');
    const toastBodyElement = document.getElementById('toast-body');

    if (toastBodyElement) {
      toastBodyElement.innerText = message;
    }

    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }

}