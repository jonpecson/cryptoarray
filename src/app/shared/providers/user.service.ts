import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  private user: any;

  constructor() {
  }

  /**
   * this is used to set our user object for current logged in user
   * @param user
   */
  set(user): void {
    this.user = user;
  }

  /**
   * this is used to get our user
   * @returns {IUser}
   */
  get(): any {
    return this.user;
  }

  /**
   * this is used to delete our user stored, by setting it to null
   */
  delete(): void {
    this.user = null;
  }

}
