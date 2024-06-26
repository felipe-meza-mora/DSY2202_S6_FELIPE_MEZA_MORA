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

/**
 * Componente principal que muestra la página de inicio de la aplicación.
 * @description Este componente carga productos desde el servicio ProductService y muestra la vista de inicio de la aplicación.
 */

export class HomeComponent implements OnInit, OnDestroy {

  /**
   * Arreglo que contiene todos los productos disponibles para mostrar en la página de inicio.
   * @type {Product[]} Arreglo de objetos de tipo Product.
   */
  products: Product[] = [];

  /**
   * Suscripción al evento de navegación del Router para recargar la lista de productos al cambiar de ruta.
   * @type {Subscription | undefined} Suscripción al evento de navegación del Router.
   */
  private routerSubscription: Subscription | undefined;

   /**
   * Variable que indica si el usuario actual tiene permisos de administrador.
   * @type {boolean} True si el usuario tiene permisos de administrador, false en caso contrario.
   */
  isAdmin: boolean = false;

   /**
   * Arreglo que representa el carrito de compras del usuario.
   * Cada elemento del arreglo contiene un producto y la cantidad seleccionada.
   * @type {{ product: Product, quantity: number }[]} Arreglo de objetos que contienen productos y cantidades.
   */
  cart: { product: Product, quantity: number }[] = [];

   /**
   * Total acumulado del valor de los productos en el carrito de compras.
   * @type {number} Valor total de los productos en el carrito.
   */
  total: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

   /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Verifica los permisos de administrador del usuario y carga la lista de productos inicial.
   * También se suscribe al evento de navegación del Router para recargar la lista de productos al cambiar de ruta.
   */

  ngOnInit(): void {
    this.checkAdmin(); 
    this.loadProducts();

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadProducts();
    });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Desuscribe la suscripción al evento de navegación del Router para evitar memory leaks.
   */

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

   /**
   * Método privado que carga la lista de productos desde el servicio ProductService.
   * Actualiza el arreglo `products` con los productos obtenidos.
   */

  private loadProducts(): void {
    this.products = this.productService.getProducts();
  }

   /**
   * Método privado que verifica si el usuario actual tiene permisos de administrador.
   * Obtiene esta información del localStorage basado en la sesión del usuario.
   * Actualiza la propiedad `isAdmin` en consecuencia.
   */

  private checkAdmin(): void {
    const sesionUsuario = localStorage.getItem('sesionUsuario');
    if (sesionUsuario) {
      const userData = JSON.parse(sesionUsuario);
      this.isAdmin = userData.permisos === 'admin';
    }
  }

  /**
   * Método que añade un producto al carrito de compras.
   * Utiliza el servicio ProductService para añadir el producto al carrito.
   * Muestra un mensaje de notificación utilizando Bootstrap Toast para indicar que el producto ha sido agregado.
   * @param {Product} product Producto que se va a añadir al carrito.
   */

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.showToast(`${product.title} ha sido agregado al carrito`);
  }

  /**
   * Método privado que muestra un Toast de Bootstrap con un mensaje específico.
   * Utiliza la librería de Bootstrap para crear y mostrar un mensaje de notificación en la interfaz.
   * @param {string} message Mensaje que se mostrará en el Toast.
   */

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