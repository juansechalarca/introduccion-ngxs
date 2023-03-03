import { Post } from 'src/app/interfaces/post.interface';

export class AgregarPost {
  static readonly type = '[Post page] AgregarPost';

  constructor(public payload: Post) {}
}
export class EditarPost {
  static readonly type = '[Post page] EditarPost';

  constructor(public payload: Post) {}
}
export class ActualizarPost {
  static readonly type = '[Post page] ActualizarPost';

  constructor(public payload: Post) {}
}

export class EliminarPost {
  static readonly type = '[Post page] EliminarPost';

  constructor(public id: string) {}
}
export class ObtenerPosts {
  static readonly type = '[Post page] ObtenerPosts';

  constructor(public id?: string) {}
}
