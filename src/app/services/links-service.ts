import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  http = inject(HttpClient);

  getShortenedLink(link: string) {
    return this.http.post('http://localhost:8080', link, { responseType: 'text' });
  }
}
