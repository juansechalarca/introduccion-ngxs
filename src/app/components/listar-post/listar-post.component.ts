import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { EditarPost, EliminarPost, ObtenerPosts } from '../store/post.actions';

@Component({
  selector: 'app-listar-post',
  templateUrl: './listar-post.component.html',
  styleUrls: ['./listar-post.component.css'],
})
export class ListarPostComponent {
  private toastr = inject(ToastrService);
  private store = inject(Store);

  ngOnInit() {
    this.store.dispatch(new ObtenerPosts());
  }

  posts$ = this.fetchPosts();

  fetchPosts(): Observable<Post[]> {
    return this.store.select((state) => state.posts.listPosts);
  }

  editarPost(post: Post) {
    this.store.dispatch(new EditarPost(post));
  }

  eliminarPost(id: any) {
    this.store.dispatch(new EliminarPost(id));
    this.toastr.success('Post eliminado exitosamente', 'Eliminar post');
  }
}
