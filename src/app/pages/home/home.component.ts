import { Component, OnInit } from '@angular/core';
import { Product, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAll(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
  }

  updateAllImages() {
    let images = {};
    for (let i = 0; i < 201; i++) {
      const changes: UpdateProductDTO = {
        images: [
          'https://picsum.photos/640/640?r=' + this.randomNumber(),
          'https://picsum.photos/640/640?r=' + this.randomNumber(),
          'https://picsum.photos/640/640?r=' + this.randomNumber(),
        ],
      };

      this.productsService.update(i.toString(), changes).subscribe();
    }
  }

  private randomNumber(): string {
    // Genera un número aleatorio entre 1000 y 9999 (ambos inclusive)
    const numeroAleatorio: number = Math.floor(Math.random() * 9000) + 1000;
    return numeroAleatorio.toString();
  }
}
