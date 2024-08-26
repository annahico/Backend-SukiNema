import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../app/services/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  // Constructor que inyecta el servicio de la API y el servicio de toastr
  constructor(private service: AppServiceService, private toastr: ToastrService) { }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Mostrar mensaje de éxito al inicializar el componente
    this.toastr.success('Hello there', 'Message from website', { timeOut: 1000 });

    // Obtener datos de la API
    this.getDataFromAPI();
  }

  // Método para obtener datos de la API
  getDataFromAPI(): void {
    this.service.getData().subscribe(
      response => {
        // Manejar la respuesta de la API
        console.log('Response from API is -->', response);
      },
      error => {
        // Manejar los errores de la API
        console.error('Error fetching data from API', error);
      }
    );
  }
}
