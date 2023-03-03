import { inject } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { PostService } from 'src/app/services/post.service';
import {
  ActualizarPost,
  AgregarPost,
  EditarPost,
  EliminarPost,
  ObtenerPosts,
} from './post.actions';
import { PostStateModel } from './post.model';

@State<PostStateModel>({
  name: 'posts',
  defaults: {
    listPosts: [],
    post: {
      id: '',
      nombre: '',
      descripcion: '',
    },
  },
})
export class PostState {
  private readonly postService = inject(PostService);

  @Action(ObtenerPosts)
  getPosts(ctx: StateContext<PostStateModel>) {
    this.postService.getPosts().subscribe((posts) => {
      //const state = ctx.getState();
      ctx.patchState({
        listPosts: [...posts],
      });
    });
  }

  //Ejecicio con el setState
  // @Action(AgregarPost)
  // agregar(ctx: StateContext<PostStateModel>, { payload }: AgregarPost) {
  //   const state = ctx.getState();
  //   ctx.setState({
  //     ...state,
  //     listPosts: [...state.listPosts, payload],
  //   });
  //   console.log(ctx.getState());
  // }

  //Ejercio con el PatchState
  @Action(AgregarPost)
  agregar(ctx: StateContext<PostStateModel>, { payload }: AgregarPost) {
    // const state = ctx.getState();
    // ctx.patchState({
    //   listPosts: [...state.listPosts, payload],
    // });
    // console.log(ctx.getState());
    //console.log(payload);
    this.postService.addPost(payload);
  }
  @Action(EditarPost)
  editar(ctx: StateContext<PostStateModel>, { payload }: EditarPost) {
    ctx.patchState({
      post: payload,
    });
  }
  @Action(ActualizarPost)
  actualizar(ctx: StateContext<PostStateModel>, { payload }: ActualizarPost) {
    console.log(payload);
    this.postService.updatePost(payload);
  }

  @Action(EliminarPost)
  eliminar(ctx: StateContext<PostStateModel>, { id }: EliminarPost) {
    // ctx.patchState({
    //   listPosts: [...ctx.getState().listPosts.filter((post) => post.id !== id)],
    // });
    this.postService.deletePost(id);
  }
}
