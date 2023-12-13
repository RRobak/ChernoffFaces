import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from "./map/map.component";
import {FacesComponent} from "./faces/faces.component";



@NgModule({
  declarations: [
    MapComponent,
    FacesComponent],
  imports: [
    CommonModule,
  ],
  exports:[MapComponent,
    FacesComponent],
  providers:[MapComponent,FacesComponent]
})
export class ComponentsModule { }
