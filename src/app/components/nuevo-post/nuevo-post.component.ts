import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/interfaces/post.interface';
import { v4 as uuidv4 } from 'uuid';
import { AgregarPost } from '../store/post.actions';

@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css'],
})
export class NuevoPostComponent {
  nombre!: string;
  descripcion!: string;

  private toastr = inject(ToastrService);
  private store = inject(Store);

  agregarPost() {
    if (!this.nombre || !this.descripcion) {
      this.toastr.error('Debe agregar infromacion a los campos', 'Error');
      return;
    }
    const post: Post = {
      id: uuidv4(),
      nombre: this.nombre,
      descripcion: this.descripcion,
    };

    this.store.dispatch(new AgregarPost(post));

    this.toastr.success('Post agregado exitosamente', 'Agregar post');

    this.limpiarForm();
  }

  limpiarForm() {
    this.nombre = '';
    this.descripcion = '';
  }
}
