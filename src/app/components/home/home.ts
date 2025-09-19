import { Component, inject, signal } from '@angular/core';
import { Card } from '../card/card';
import { InputComponent } from '../input-component/input-component';
import { NgClass } from '@angular/common';
import { LinksService } from '../../services/links-service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Card, InputComponent, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  enabled = signal(true);
  shortenedLink = signal<string>('');
  copyTooltip = signal(false);
  linkService = inject(LinksService);

  shortenTheLink(link: string) {
    this.copyTooltip.set(false);
    this.enabled.set(false);
    console.log(link);
    if (link.length === 0) {
      alert('Please enter your link!');
    } else {
      this.linkService
        .getShortenedLink(link)
        .pipe(
          catchError((err) => {
            console.log(err);
            alert('Error occurred!');
            throw err;
          })
        )
        .subscribe((val) => {
          this.shortenedLink.set(val);
        });
    }

    this.enabled.set(true);
  }
  copyTheValue(link: string) {
    navigator.clipboard.writeText(link);
    this.copyTooltip.set(true);
  }
}
