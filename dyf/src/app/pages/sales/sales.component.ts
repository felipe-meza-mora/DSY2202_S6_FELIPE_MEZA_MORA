import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})

export class SalesComponent implements OnInit {
  pedidos: any[] = [];
  usuario: any = null;
  permisos: string = '';

  ngOnInit() {
    // Obtener el usuario del local storage
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      this.usuario = JSON.parse(usuarioStorage);
      this.permisos = this.usuario.permisos;
    }

    // Obtener los pedidos del local storage
    const pedidosStorage = localStorage.getItem('pedidos');
    if (pedidosStorage) {
      this.pedidos = JSON.parse(pedidosStorage);
    }
  }

  // Método para actualizar el estado del pedido
  actualizarEstado(pedido: any, nuevoEstado: string) {
    pedido.estado = nuevoEstado;
    // Actualizar en el local storage
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
  }
}