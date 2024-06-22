import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import{ ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any; 



@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})

export class ShoppingCartComponent implements OnInit {
  cart: { product: Product, quantity: number }[] = [];
  total: number = 0;
  userLoggedIn: boolean = false;
  userInfoForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router) {
    this.userInfoForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCart();
    this.checkUserSession();
  }

  private loadCart(): void {
    this.cart = this.productService.getCart();
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.total = this.cart.reduce((sum, item) => sum + item.product.precio * item.quantity, 0);
  }

  private checkUserSession(): void {
    const sesionUsuario = localStorage.getItem('sesionUsuario');
    this.userLoggedIn = !!sesionUsuario;
    if (this.userLoggedIn && sesionUsuario) {
      const userData = JSON.parse(sesionUsuario);
      this.userInfoForm.patchValue({
        nombre: userData.nombre,
        direccion: userData.direccionEnvio,
        correo: userData.email,
        telefono: userData.telefono,
      });
    }
  }

  incrementQuantity(productId: number): void {
    this.productService.incrementQuantity(productId);
    this.loadCart();
  }

  decrementQuantity(productId: number): void {
    this.productService.decrementQuantity(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.productService.clearCart();
    this.loadCart();
  }

  proceedToCheckout(): void {
    const pedido = {
      nombre: '',
      direccion: '',
      correo: '',
      telefono: '',
      total: this.total,
      detalle: this.cart.map(item => ({
        img: item.product.thumbnailUrl,
        producto: item.product.title,
        cantidad: item.quantity,
        precio: item.product.precio,
        subtotal: item.product.precio * item.quantity
      })),
      estado: 'Procesado'
    };

    if (this.userLoggedIn) {
      const sesionUsuario = JSON.parse(localStorage.getItem('sesionUsuario') || '{}');
      pedido.nombre = sesionUsuario.nombre;
      pedido.direccion = sesionUsuario.direccionEnvio;
      pedido.correo = sesionUsuario.email;
      pedido.telefono = sesionUsuario.telefono;
    } else {
      if (this.userInfoForm.valid) {
        pedido.nombre = this.userInfoForm.value.nombre;
        pedido.direccion = this.userInfoForm.value.direccion;
        pedido.correo = this.userInfoForm.value.correo;
        pedido.telefono = this.userInfoForm.value.telefono;
        
      } else {
        // Si el formulario no es válido, no proceder con el checkout
        return;
      }
    }

    let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Destruir sesión del usuario si no está logueado
    if (!this.userLoggedIn) {
      localStorage.removeItem('sesionUsuario');
    }

    //destruir sesion de cart
     this.clearCart();

     this.showToast(`¡Pedido realizado con éxito! Redirigiendo a la página de inicio...`);

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 4000);




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