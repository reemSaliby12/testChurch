import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../_services/users.service';
import { UserRoles } from '../_models/UserRoles';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () =>
{
  const userService = inject(UsersService);
 // const router = inject(Router);

  return userService.loggedUser$.pipe
  (
    map
    (
      user=>
      {
        if (user)
        {
          if (user.roles.includes(UserRoles.Bishop)||user.roles.includes(UserRoles.SystemAdmin))
          {
            return true;
          }
          else
          { 
            alert('UnAuthorized....');
            return false;
          }
          
        }
        alert('UnAuthorized....');
        return false;
      }
    )
  )
 // return true;
};
