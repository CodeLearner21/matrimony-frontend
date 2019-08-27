import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = new Subject<boolean>();
  constructor() { }
  show() {
    const addClass = document.getElementById('addclass');
    addClass.classList.add('spinner-border');
  }
  hide() {
    const addClass = document.getElementById('addclass');
    addClass.classList.remove('spinner-border');
  }
}
