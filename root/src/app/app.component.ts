import { Component } from '@angular/core';
import {GapiSession} from './gapi.session';

declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'google-drive-example';

  constructor(public gapiSession: GapiSession) {}


  job = ['Dev', 'AC', 'Classroom'];

  signIn() {
    this.gapiSession.signIn()
      .then(() => {
        if (this.gapiSession.isSignedIn) {
          console.log('User already signed in');
        } else {
          console.log('User is not signed in');
        }
      });
  }

  signOut() {
    this.gapiSession.signOut();
  }

  disconnect() {
    this.gapiSession.disconnect();
  }

  async create() {

    for (let i = 0; i < this.job.length; i++) {
       await this.gapiSession.createNewFolder(this.job[i], '0AOh8qFxun6mcUk9PVA')
        .then((res) => {
          console.log(res.result);
        });
    }


  }

  async searchFolderNamedFitFinder() {

    // const promises = [];
    //
    // for (let i = 0; i < this.job.length; i++) {
    //
    //   await this.gapiSession.searchFolder('root', this.job[i])
    //     .then((res) => {
    //
    //       console.log(res);
    //     });
    //
    // //  promises.push(this.gapiSession.searchFolder('root', this.job[i]));
    // }


    this.gapiSession.searchFolder('root',
      'Classroom')
      .then((res) => {

        console.log(res);
      });

    // Promise.all(promises)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // let j = [];
    // for (let i = 0; i < this.job.length; i++) {
    //
    //
    //   this.gapiSession.searchFolder('root', this.job[i])
    //     .then((res) => {
    //
    //         j.push(res);
    //       }
    //
    //       // if (res.result.files.length === 0) {
    //       //   this.gapiSession.createNewFolder(this.job[i], 'root').then();
    //       //   console.log(res.result + i);
    //       //
    //       //   resolve();
    //       // } else {
    //       //   this.gapiSession.createNewFolder(this.job[i], res.result.files[0].id).then();
    //       //   resolve();
    //       // }
    //
    //
    //     ).then(() => {
    //       console.log(j);
    //   });
    // }


      //
      // p = p.then(_ => new Promise(resolve =>
      //   setTimeout(function () {
      //     console.log(i);
      //     resolve();
      //   }, Math.random() * 1000)
      // ));
    }



    // this.job.forEach((x) => {
    //
    //   this.gapiSession.searchFolder('root', x).then(
    //     (res) => {
    //       if (res.result.files.length === 0) {
    //        // this.gapiSession.createNewFolder(x, 'root').then();
    //       } else {
    //         this.gapiSession.createNewFolder(x, res.result.files[0].id).then();
    //       }
    //     }
    //   )
    //
    // });

    //
    // for (let i = 0; i < 5; i ++) {
    //   this.gapiSession.searchFolder('1Q7HsVSKcaYyus8hLY9Hc2G4md1hwwxZf',
    //     '')
    //     .then((res) => {
    //       this.gapiSession.createNewFolder('Fit', 'root')
    //         .then((data) => {
    //           console.log(data.result);
    //         });
    //     });
    // }

  async waitForPromise() {
    // let result = await any Promise, like:
    let result = await Promise.resolve('this is a sample promise');
  }




  getCurrentUser() {
    this.gapiSession.getCurrentUser();
  }

  }








