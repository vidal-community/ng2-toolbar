import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';

import { DiscoveryService } from 'vidal-ng2-discovery';
import { SesameService } from 'vidal-ng2-sesame';

import { ToolbarComponent } from './toolbar.component';

export const fake_routes: Routes = [
];

const faceUrl = 'http://placekitten.com.s3.amazonaws.com/homepage-samples/96/139.jpg';
const logoUrl = 'http://placekitten.com.s3.amazonaws.com/homepage-samples/96/140.jpg';

const services = [
    { shortDescription: 'toto', url: '#' },
    { shortDescription: 'titi', url: '#' },
    { shortDescription: 'tutu', url: '#' },
  ];

class MockSesame {
  userInfo() { return Observable.of({username: 'toto'}); }
  myFaceUrl() { return this.userInfo().map(() => faceUrl); }
}

class MockDiscovery {
  services() { return Observable.of(services); }
}

describe('Vidal toolbar component', () => {
  let mockSesame: MockSesame;
  let mockDiscovery: MockDiscovery;

  beforeEach(() => {
    mockSesame = new MockSesame();
    mockDiscovery = new MockDiscovery();

    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule.withRoutes(fake_routes) ],
      declarations: [ToolbarComponent],
      providers: [
        { provide: DiscoveryService, useValue: mockDiscovery},
        { provide: SesameService, useValue: mockSesame}
      ]
    });
  });

  it('should not be logged',
    inject([], () => {
      mockSesame.userInfo = jasmine.createSpy('userInfo').and.returnValue(Observable.empty());
      const toolbar = TestBed.createComponent(ToolbarComponent);
      toolbar.detectChanges();
      const element = toolbar.debugElement.nativeElement.querySelector('#not-logged');
      expect(element).toBeTruthy();
    })
  );

  it('should show face url',
    inject([], () => {
      const toolbar = TestBed.createComponent(ToolbarComponent);
      toolbar.detectChanges();
      const element = toolbar.debugElement.queryAll(By.all());
      expect(element).toBeTruthy();
      const avatar = toolbar.debugElement.query(By.css('.avatar div'));
      expect(avatar.styles.background).toContain(faceUrl);
    })
  );

  it('should show search services',
    inject([], () => {
      const toolbar = TestBed.createComponent(ToolbarComponent);
      toolbar.detectChanges();
      const btn = toolbar.debugElement.query(By.css('.toolbar-search a.btn'));
      btn.nativeElement.click();
      toolbar.detectChanges();
      const result = toolbar.debugElement.query(By.css('.search-results'));
      expect(result.children.length).toBe(services.length);
    })
  );

  it('should show logo',
    inject([], () => {
      const toolbar = TestBed.createComponent(ToolbarComponent);
      toolbar.debugElement.componentInstance.logo = logoUrl;
      toolbar.detectChanges();
      const logo = toolbar.debugElement.query(By.css('.logo img'));
      expect(logo.nativeElement.src).toBe(logoUrl);
    })
  );

  it('should show navbar',
    inject([], () => {
      const toolbar = TestBed.createComponent(ToolbarComponent);
      toolbar.debugElement.componentInstance.applicationName = 'My APP';
      toolbar.detectChanges();
      const appName = toolbar.debugElement.query(By.css('.application-name span'));
      expect(appName.nativeElement.innerText).toBe('My APP');
    })
  );
});
