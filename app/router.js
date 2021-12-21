import EmberRouter from '@ember/routing/router';
import config from 'hackathon-poc/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('checkout');
  this.route('scheduler');
  this.route('marriage');
  this.route('business');
  this.route('identity');
});
