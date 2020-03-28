import { Component } from '@angular/core';
import { JokeService } from './joke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Geek Joke';
  joke: string = "Click the button below to fetch a joke.";

  constructor(private readonly jokeService: JokeService) { }

  async fetchJoke() {
    this.joke = "Fetching a joke...";
    this.joke = await this.jokeService.getJoke();
  }

}
