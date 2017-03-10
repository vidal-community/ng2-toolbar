

export const HTML = `<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="logo navbar-brand" routerLink="">
        <img [alt]="applicationName" [src]="logo">
      </a>
      <a class="application-name navbar-brand" routerLink="">
        <span>{{applicationName}}</span>
      </a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ng-content></ng-content>
      <ul class="nav navbar-nav navbar-right">
        <li class="toolbar-search">
          <div class="navbar-form navbar-collapse" label="Rechercher" icon="glyphicon-search">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Rechercher" [(ngModel)]="search" (keyup.enter)="showSearch()">
            </div>
            <span class="btn-group" dropdown keyboardNav="true">
              <a class="btn btn-default"
                dropdownToggle
                (click)="updateSearch(search)"
                #searchBtn><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>
              <ul class="search-results" dropdownMenu>
                  <li *ngFor="let search of searches | async">
                    <a class="dropdown-item" href="{{search.url}}">
                      {{search.shortDescription}}
                    </a>
                </li>
              </ul>
            </span>
          </div>
        </li>

        <li class="big applications" dropdown keyboardNav="true">
          <a dropdownToggle (click)="updateApps()"><span class="glyphicon glyphicon-th"></span></a>
          <ul dropdownMenu>
            <li *ngFor="let app of applications | async">
              <a href="{{app.url}}">
                <img *ngIf="app.meta?.icon" src="{{app.url + app.meta.icon}}"/>
                {{app.shortDescription}}
              </a>
            </li>
          </ul>
        </li>

        <li id="not-logged" dropdown class="big" *ngIf="!username" >
          <a dropdownToggle id="login-dropdown"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a>
          <div dropdownMenu aria-labelledby="login-dropdown" class="login-menu" (keyup.enter)="connect()">
            <div>
              <input [(ngModel)]="login" placeholder="Login" />
            </div>
            <div>
              <input [(ngModel)]="password" type="password" placeholder="Mot de passe" />
            </div>
            <div><button class="btn btn-primary" (click)="connect()">Connexion</button></div>
          </div>
        </li>

        <li id="logged" dropdown *ngIf="username">
          <a dropdownToggle class="avatar" id="user-dropdown">
            <div class="circular userIcon" [ngStyle]="userIcon" placement="left"></div>
          </a>

          <div dropdownMenu aria-labelledby="user-dropdown" style="padding: 15px;">
            <button class="btn btn-danger btn-s" (click)="logout()"><span class="glyphicon glyphicon-off"></span>
                Déconnexion
            </button>
          </div>
        </li>
      </ul>
    </div>
    <!-- /.navbar-collapse -->
  </div>
  <!-- /.container-fluid -->
</nav>`;

export const CSS = `.navbar-brand.logo{
    margin-top: -4px;
}
.login-menu{
  display: flex;
  flex-direction: column;
  padding: 5px;
  z-index: 999;
}
.login-menu > div{
  margin: auto;
  padding: 3px;
}

li.big{
  height:50px;
}

.big .glyphicon{
  font-size: 25px;
  margin-top: -3px;
}

.circular {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
}
.navbar .avatar{
    padding: 8px;
}

.applications .dropdown ul{
    list-style-type: none;
    padding: 5px 20px;
}

.applications .dropdown ul li{
    white-space: nowrap;
    padding: 5px;
}

.applications .dropdown ul li a{
    color: #000;
    cursor: pointer;
}

.toolbar-search input[type="text"] {
    -webkit-transition: all 0.7s ease 0s;
    -moz-transition: all 0.7s ease 0s;
    -o-transition: all 0.7s ease 0s;
    transition: all 0.7s ease 0s;
}

.toolbar-search input[type="text"] {
    width: 150px;
}

.toolbar-search input[type="text"]:focus {
   width: 300px;
}`;
