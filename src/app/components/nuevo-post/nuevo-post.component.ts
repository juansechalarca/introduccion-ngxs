import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { v4 as uuidv4 } from 'uuid';
import { ActualizarPost, AgregarPost } from '../store/post.actions';
@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css'],
})
export class NuevoPostComponent {
  private formBuilder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private store = inject(Store);

  private post!: Post;

  postForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  ngOnInit() {
    this.fetchPost().subscribe((post) => {
      this.post = post;
      this.postForm.patchValue({
        ...this.post,
      });
    });
  }

  agregarPost() {
    if (this.post.id) {
      this.store.dispatch(
        new ActualizarPost({
          ...(this.postForm.value as Post),
          id: this.post.id,
        })
      );
      this.post = {
        id: '',
        nombre: '',
        descripcion: '',
      };
      this.toastr.success('Post actualizado exitosamente', 'Agregar post');
      this.limpiarForm();
      return;
    }
    const post: Post = {
      ...(this.postForm.value as Post),
      id: uuidv4(),
    };
    this.store.dispatch(new AgregarPost(post));
    this.toastr.success('Post agregado exitosamente', 'Agregar post');
    this.limpiarForm();
  }

  limpiarForm() {
    this.postForm.reset();
  }

  fetchPost(): Observable<Post> {
    return this.store.select((state) => state.posts.post);
  }
}
