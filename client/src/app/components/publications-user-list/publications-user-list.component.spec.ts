import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsUserListComponent } from './publications-user-list.component';

describe('PublicationsUserListComponent', () => {
  let component: PublicationsUserListComponent;
  let fixture: ComponentFixture<PublicationsUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationsUserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationsUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
