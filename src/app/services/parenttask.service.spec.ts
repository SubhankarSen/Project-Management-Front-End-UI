import { TestBed } from '@angular/core/testing';
import { ParenttaskService } from './parenttask.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ParenttaskService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[ParenttaskService]
  }));

  it('should be created', () => {
    const service: ParenttaskService = TestBed.get(ParenttaskService);
    expect(service).toBeTruthy();
  });

  it ('should return all Parent Tasks',() => {
    const service: ParenttaskService = TestBed.get(ParenttaskService);
    let i = service.getParenttask().subscribe.length;
    expect(i).toEqual(3);
  });

  it('should return Parent task by ID',() => {
    const service: ParenttaskService = TestBed.get(ParenttaskService);
    expect(service.getParenttaskById.length).toEqual(1);
  });

  it('should create new Parent Task',() => {
    const service: ParenttaskService = TestBed.get(ParenttaskService);
    const demoPTask = {
      parentTaskID: '99', 
      parentTaskDesc: 'new demo task from Angular'
    };
    service.CreateParenttask(demoPTask).subscribe();
    expect(demoPTask).toBeTruthy();
  });

  it('should update Parent Task by ID',() => {
    const service: ParenttaskService = TestBed.get(ParenttaskService);
    const demoPTaskUpdate = {
      parentTaskID: '1',
      parentTaskDesc: 'demo Task update from Angular'
    };
    service.UpdateParenttask(demoPTaskUpdate).subscribe();
    expect(demoPTaskUpdate).toBeTruthy();
  });

  it('should delete the selected Parent task',() => {
    const service: ParenttaskService = TestBed.get(ParenttaskService);
    expect(service.DeleteParenttask.length).toEqual(1);
  });
});
