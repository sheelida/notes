import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public user:any;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Signup',
      url:'/signup',
      icon: 'person-add'
    },
    {
      title: 'Signin',
      url:'/signin',
      icon: 'log-in'
    },
    {
      title: 'Signout',
      url:'/signout',
      icon: 'exit'
    }
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth:AngularFireAuth,
    private router:Router
  ) {
    this.initializeApp();
    this.checkAuthStatus();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  //check if it's logged to change the view
  checkAuthStatus(){
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        this.user = user;
        //update navigation for logged in user
        this.appPages = [
          {
            title: 'Home',
            url: '/home',
            icon: 'home'
          },
          {
            title: 'List',
            url: '/list',
            icon: 'list'
          },
          {
            title: 'Signout',
            url:'/signout',
            icon: 'exit'
          }
        ];
      }
      else{
        this.user = null;
        this.router.navigate(['/signin']);
        //update navigation for non authed user
        this.appPages = [
          {
            title: 'Signup',
            url:'/signup',
            icon: 'person-add'
          },
          {
            title: 'Signin',
            url:'/signin',
            icon: 'log-in'
          }
        ];
      }
    });
  }
}
