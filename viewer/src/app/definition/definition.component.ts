import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrl: './definition.component.scss',
})
export class DefinitionComponent {
  constructor(private route: ActivatedRoute, private appService: AppService) {}

  jump() {
    const resource = this.route.snapshot.paramMap.get('resource');
    if (resource) {
      document.querySelectorAll('h2').forEach((el) => {
        if (el.textContent?.includes(resource)) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    //TODO: in case there is an id multiple times (like in different resources), we need to find the correct by first going to the h2 and then to the h3.
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      document.querySelectorAll('h3').forEach((el) => {
        console.log(el.textContent);
        if (el.textContent?.includes(id)) {
          console.log('scroll');
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
}
