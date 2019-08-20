import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { UsertaskService } from './usertask.service';

describe('UsertaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[UsertaskService]
  }));

  it('should be created', () => {
    const service: UsertaskService = TestBed.get(UsertaskService);
    expect(service).toBeTruthy();
  });

  it ('should return all Users',() => {
    const service: UsertaskService = TestBed.get(UsertaskService);
    let i = service.getUsertask().subscribe.length;
    expect(i).toEqual(3);
  });

  it('should return User by ID',() => {
    const service: UsertaskService = TestBed.get(UsertaskService);
    expect(service.getUsertaskById.length).toEqual(1);
  });

  it('should delete the selected User',() => {
    const service: UsertaskService = TestBed.get(UsertaskService);
    expect(service.DeleteUsertask.length).toEqual(1);
  });
});
