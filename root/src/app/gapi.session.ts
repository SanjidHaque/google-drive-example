import {Injectable} from '@angular/core';

const CLIENT_ID = '702778738746-7a3e9tc282csr0e8fnekj1cdd5c4kbd5.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB41UTFYHcZcdEr947h6GCQyd9ESUUYRzk';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive';

declare var gapi: any;

@Injectable()
export class GapiSession {

  googleAuth: gapi.auth2.GoogleAuth;
  companyName = 'FitFinder-Headblocks';

  constructor() {}


  initClient() {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        return gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        }).then((res: any) => {
          this.googleAuth = gapi.auth2.getAuthInstance();
          resolve();
        });
      });
    });

  }


  isSignedIn() {
    return this.googleAuth.isSignedIn.get();
  }

  signIn() {
    return this.googleAuth.signIn({
        prompt: 'consent'
      }).then((googleUser: gapi.auth2.GoogleUser) => {

      console.log(googleUser.getBasicProfile());

    });
  }


  createNewFolder(newFolderName: string, parentFolderId: string) {



    if (!this.isSignedIn()) {
      console.log('Sign in first!');
      return;
    }



    const newFolder = {
      name: newFolderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId]
    };

    return gapi.client.drive.files.create({
      resource: newFolder,
      fields: 'id, name'
    });
  }



  searchFolder(parentFolderId: string, queryFolderName: string) {
    const pageToken = null;

    return gapi.client.drive.files.list({
      q: `name = '${queryFolderName}' and ` +
         `mimeType = 'application/vnd.google-apps.folder' and ` +
          `'${parentFolderId}' in parents and ` +
          `trashed = false`,
        fields: '*',
        spaces: 'drive',
        corpora: 'user',
        pageToken
    });
    
  }


  getStartPageToken() {
     gapi.client.drive.changes.getStartPageToken()
       .then((res) => {
        console.log(res);
       });
  }

  trackJobFolderChanges() {


    const pageToken = '11844';

    gapi.client.drive.changes.list({
      pageToken,
      restrictToMyDrive: true,
      spaces: 'drive',
      fields: '*'
    }).then((res) => {
      console.log(res);
    });


  }




  signOut(): void {
    this.googleAuth.signOut();
  }

  disconnect() {
    this.googleAuth.disconnect();
  }

  getCurrentUser() {
    console.log(this.googleAuth.currentUser.get());
  }
}
