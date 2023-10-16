import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuType: string = 'default';
  userName: string = '';
  userRole: string = '';
  constructor(private route: Router) {}
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          console.log(userData);
          let userInfo = userData.user;
          console.log(userInfo.name);
          this.userName = userInfo.name;
          this.userRole = userInfo.role;
          console.log('myrole', this.userRole);
          if (this.userRole == 'user') {
            this.menuType = 'user';
          } else {
            this.menuType = 'Admin';
          }
        } else {
          this.menuType = 'default';
        }
      }
    });
  }
  userlogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/register']);
  }
}
