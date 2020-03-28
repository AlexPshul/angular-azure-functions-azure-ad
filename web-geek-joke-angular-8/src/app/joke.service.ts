import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  constructor(private readonly httpClient: HttpClient) { }

  getJoke(): Promise<string> {
    return this.httpClient.get<string>(environment.jokeUrl).toPromise();
  }
}
