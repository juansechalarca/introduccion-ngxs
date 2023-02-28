import { Action, State, StateContext } from '@ngxs/store';
import { AgregarPost, EliminarPost } from './post.actions';
import { PostStateModel } from './post.model';

@State<PostStateModel>({
  name: 'posts',
  defaults: {
    listPosts: [],
  },
})
export class PostState {
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
    const state = ctx.getState();
    ctx.patchState({
      listPosts: [...state.listPosts, payload],
    });
    console.log(ctx.getState());
  }

  @Action(EliminarPost)
  eliminar(ctx: StateContext<PostStateModel>, { id }: EliminarPost) {
    ctx.patchState({
      listPosts: [...ctx.getState().listPosts.filter((post) => post.id !== id)],
    });
  }
}
