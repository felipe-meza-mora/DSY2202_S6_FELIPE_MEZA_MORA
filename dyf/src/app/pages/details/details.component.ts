import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';

declare var bootstrap: any; 

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  
  ngOnInit(): void{
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product = this.productService.getProductById(parseInt(productId, 10));
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
