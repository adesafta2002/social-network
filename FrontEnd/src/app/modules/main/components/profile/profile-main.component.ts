import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'profile-main',
  templateUrl: 'profile-main.component.html',
  styleUrls: ['profile-main.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  alive = true
  constructor(private route: ActivatedRoute, private authService: AuthService) {

  }
  ngOnInit() {
    this.route.params.pipe(
      takeWhile(() => this.alive),
    ).subscribe(params =>
      console.log(params['id'])
    )
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
