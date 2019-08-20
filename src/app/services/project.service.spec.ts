import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[ProjectService]
  }));

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it ('should return all Projects',() => {
    const service: ProjectService = TestBed.get(ProjectService);
    let i = service.getProject().subscribe.length;
    expect(i).toEqual(3);
  });

  it('should return Project by ID',() => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service.getProjectById.length).toEqual(1);
  });

  it('should delete the selected Project',() => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service.DeleteProject.length).toEqual(1);
  });
});
