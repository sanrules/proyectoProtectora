import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../_services/user/user-service';

@Pipe({name: 'userIdToName'})
export class UserIdToNamePipe implements PipeTransform {

  constructor(private userService: UserService) {}

  async transform(id: number): Promise<string> {
    console.log('id', id);
    let userName: string;

    await this.userService.getuserById(id).subscribe(user => {
      console.log('user: ', user);
      userName = user.response.username;
      console.log('userName: ', userName)
    });

    return userName;
  }

}
