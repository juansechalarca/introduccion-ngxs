import { inject, Injectable } from '@angular/core';
import {
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly firestore = inject(Firestore);

  private readonly postRef = collection(this.firestore, 'posts');

  addPost(post: Post) {
    return addDoc(this.postRef, post);
  }

  async updatePost(post: Post) {
    let q = query(this.postRef, where('id', '==', post.id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'posts', document.id);
      await updateDoc(docRef, { ...post });
    });
  }

  getPosts(filter = '') {
    let q = query(this.postRef);
    if (filter) q = query(this.postRef, where('nombre', '==', filter));
    return collectionData(q) as unknown as Observable<Post[]>;
  }

  async deletePost(id: string) {
    let q = query(this.postRef, where('id', '==', id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'posts', document.id);
      await deleteDoc(docRef);
    });
  }
}
