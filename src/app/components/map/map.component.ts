import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {Observable, Subscription} from "rxjs";

interface VoivodeshipStyles {
  [key: string]: { top: string; left: string };
}
interface VoivodeshipFacesInterface {
  [key: string]: { headType: number; eyeType: number; mouthType: number; earType: number; hairType: number };
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input() minMax!:Observable<any>;
  voivodeship:VoivodeshipStyles={
    'PODLASKIE': { 'top': '20%', 'left': '69%' },
    'LUBUSKIE': { 'top': '40%', 'left': '23%' },
    'MAZOWIECKIE': { 'top': '36%', 'left': '58%' },
    'WARMIŃSKO-MAZURSKIE': { 'top': '12%', 'left': '56%' },
    'KUJAWSKO-POMORSKIE': { 'top': '26%', 'left': '43%' },
    'ŚWIĘTOKRZYSKIE': { 'top': '66%', 'left': '57%' },
    'ŁÓDZKIE': { 'top': '50%', 'left': '49%' },
    'POMORSKIE': { 'top': '6%', 'left': '40%' },
    'DOLNOŚLĄSKIE': { 'top': '59%', 'left': '30%' },
    'PODKARPACKIE': { 'top': '81%', 'left': '66%' },
    'MAŁOPOLSKIE': { 'top': '81%', 'left': '54%' },
    'OPOLSKIE': { 'top': '66%', 'left': '39%' },
    'WIELKOPOLSKIE': { 'top': '40%', 'left': '35%' },
    'ZACHODNIOPOMORSKIE': { 'top': '15%', 'left': '26%' },
    'LUBELSKIE': { 'top': '56%', 'left': '68%' },
    'ŚLĄSKIE': { 'top': '72%', 'left': '46%' },
  }
  voivodeshipFaces:VoivodeshipFacesInterface= {
  'PODLASKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'LUBUSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'MAZOWIECKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'WARMIŃSKO-MAZURSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'KUJAWSKO-POMORSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'ŚWIĘTOKRZYSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'ŁÓDZKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'POMORSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'DOLNOŚLĄSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'PODKARPACKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'MAŁOPOLSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'OPOLSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'WIELKOPOLSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'ZACHODNIOPOMORSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'LUBELSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
  'ŚLĄSKIE': { 'headType': 0, 'eyeType': 0, 'mouthType': 0, 'earType': 0, 'hairType': 0 },
}
  constructor() {}

  ngOnInit(): void {
    this.minMax.subscribe(data=> {
      console.log(data)
      if(data!==undefined&&data!==null){
        for (const key in this.voivodeshipFaces) {
          if (this.voivodeshipFaces.hasOwnProperty(key)) {
            let params = this.voivodeshipFaces[key];
            const headType = data[0].voivodeship.findIndex((element: string) => element === key)
            const eyeType = data[1].voivodeship.findIndex((element: string) => element === key)
            const mouthType = data[2].voivodeship.findIndex((element: string) => element === key)
            const earType = data[3].voivodeship.findIndex((element: string) => element === key)
            const hairType = data[4].voivodeship.findIndex((element: string) => element === key)
            params.headType = Math.round(headType / 5) == 3 ? 2 : Math.round(headType / 5);
            params.eyeType = Math.round(eyeType / 5) == 3 ? 2 : Math.round(eyeType / 5);
            params.mouthType = Math.round(mouthType / 5) == 3 ? 2 : Math.round(mouthType / 5);
            params.earType = Math.round(earType / 5) == 3 ? 2 : Math.round(earType / 5);
            params.hairType = Math.round(hairType / 5) == 3 ? 2 : Math.round(hairType / 5);
            this.voivodeshipFaces[key] = params
          }
        }
      }
      console.log(this.voivodeshipFaces)
    })
  }
  getVoivodeshipKeys() {
    return Object.keys(this.voivodeship);
  }
}
