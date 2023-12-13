import { Component } from '@angular/core';
import {GetCSVService} from "./services/get-csv.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chernoff';
  dataBS:BehaviorSubject<any>= new BehaviorSubject<any>(null);
  data$:Observable<any>=this.dataBS.asObservable()
  data!:object;
  constructor(private getCSVService:GetCSVService) {
    this.getCSVService.getData().subscribe(data=> {
      this.dataBS.next(data);
    });
  }
}
