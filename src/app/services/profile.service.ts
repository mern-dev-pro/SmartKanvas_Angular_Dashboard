import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileDictonary = {
    Administrator: 'Administrador',
    User: 'Membro da Equipe',
    Guest: 'Visualizador'
  }
  constructor(private apollo: Apollo) { }

  getAllProfiles() {
    return this.apollo.query({
      query: gql`
        query {
          getAllProfile {
            ID
            Profile
            IsAdmin
          }
        }
      `
    })
  }
}
