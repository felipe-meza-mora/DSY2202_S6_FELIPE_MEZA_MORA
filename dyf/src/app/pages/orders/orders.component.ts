import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];
  usuario: any = null;
  correoFiltro: string = '';
  nombreFiltro: string = '';

  ngOnInit() {
    // Obtener el usuario del local storage
    const usuarioStorage = localStorage.getItem('sesionUsuario');
    if (usuarioStorage) {
      this.usuario = JSON.parse(usuarioStorage);

      this.correoFiltro = this.usuario.email;
      this.nombreFiltro = this.usuario.nombre;
    }

    // Obtener los pedidos del local storage
    const pedidosStorage = localStorage.getItem('pedidos');
    if (pedidosStorage) {
      this.pedidos = JSON.parse(pedidosStorage);
    }

    // Filtrar los pedidos por el correo del usuario
    this.filtrarPedidos();
  }

  filtrarPedidos() {
    if (this.correoFiltro) {
      this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.correo === this.correoFiltro);
    } else {
      this.pedidosFiltrados = [];
    }
  }
}