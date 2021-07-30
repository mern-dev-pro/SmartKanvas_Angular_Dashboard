import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';
import { environment } from '../environments/environment';
import { SnackBarService } from './services/snack-bar.service';
const uri = environment.url; // <-- add the URL of the GraphQL server here


@NgModule({
  imports: [
    ApolloModule,
  ],
  exports: [
    ApolloModule,
    HttpClientModule,
    HttpLinkModule
  ],
  providers: [
    HttpLink
  ]

})
export class GraphQLModule {
  networkErrors: any;
  uri: any;
  fakeApiUri: any;
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private snackBarService: SnackBarService
  ) {
    this.uri = httpLink.create({
      uri,
      withCredentials: true,
    });

    // this.fakeApiUri = httpLink.create({
    //   uri: 'http://localhost:3000/graphql'
    // });

    const cache = new InMemoryCache();
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          this.snackBarService.showNotification({ message, type:'error' })
          // this.toastr.error('Error', message),
        );
      }
      if (networkError) {
        this.networkErrors = networkError;
        console.log(networkError);
      // this.networkErrors.error.errors.map(data => {
      //});
      }
    });


    const link = errorLink.concat(this.uri);
    // apollo.createNamed('fakeApiClient',{
    //   link: this.fakeApiUri,
    //   cache,
    //   defaultOptions: {
    //     query: {
    //       fetchPolicy: 'network-only'
    //     }
    //   }
    // })
    apollo.create({
        link,
        cache,
        typeDefs: gql`
        enum CheckOptions {
          in
          out
        }
      `,
        defaultOptions: {
          watchQuery: {
            errorPolicy: 'all'
          },
          query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
          },

        }
      });
    }


}
