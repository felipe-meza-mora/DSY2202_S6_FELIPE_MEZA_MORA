import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import{ ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cart: { product: Product, quantity: number }[] = [];
  total: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart(): void {
    this.cart = this.productService.getCart();
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.total = this.cart.reduce((sum, item) => sum + item.product.precio * item.quantity, 0);
  }

  incrementQuantity(productId: number): void {
    this.productService.incrementQuantity(productId);
    this.loadCart();
  }

  decrementQuantity(productId: number): void {
    this.productService.decrementQuantity(productId);
    this.loadCart();
  }
}