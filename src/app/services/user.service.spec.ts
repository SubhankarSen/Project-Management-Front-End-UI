import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[UserService]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it ('should return all Users',() => {
    const service: UserService = TestBed.get(UserService);
    let i = service.getUser().subscribe.length;
    expect(i).toEqual(3);
  });

  it('should return User by ID',() => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUserById.length).toEqual(1);
  });

  it('should create new User',() => {
    const service: UserService = TestBed.get(UserService);
    const demoUser = {
      userID: '99', 
      userFirstName: 'new user FN',
      userLastName: 'new user LN',
      userEmployeeID: 999999
    };
    service.CreateUser(demoUser).subscribe();
    expect(demoUser).toBeTruthy();
  });

  it('should update User by ID',() => {
    const service: UserService = TestBed.get(UserService);
    const demoUserUpdate = {
      userID: '99', 
      userFirstName: 'updated user FN',
      userLastName: 'updated user LN',
      userEmployeeID: 999991
    };
    service.UpdateUser(demoUserUpdate).subscribe();
    expect(demoUserUpdate).toBeTruthy();
  });

  it('should delete the selected User',() => {
    const service: UserService = TestBed.get(UserService);
    expect(service.DeleteUser.length).toEqual(1);
  });
});
