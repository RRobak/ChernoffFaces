import { Component, Input, OnInit } from '@angular/core';
import {HeadType, EyeType, MouthType, EarType, HairType} from './face-types.enum';
@Component({
  selector: 'app-faces',
  templateUrl: './faces.component.html',
  styleUrls: ['./faces.component.scss']
})
export class FacesComponent {
  @Input() headType!: HeadType;
  @Input() eyeType!: EyeType;
  @Input() mouthType!: MouthType;
  @Input() earType!: EarType;
  @Input() hairType!: HairType;
  @Input() description!:string;


  constructor() { }

  ngOnInit(): void {
  }

  getHeadPath(): string {
    switch (this.headType) {
      case HeadType.Round:
        return 'M 50,10 a 40,40 0 1,0 0,80 a 40,40 0 1,0 0,-80';
      case HeadType.Square:
        return 'M 10,10 h 80 v 80 h -80 Z';
      case HeadType.Rectangle:
        return 'M 10,10 L 90,10 L 100,50 L 50,100 L 0,50 Z';
    }
    return ''
  }


  getEyePath(): string {
    switch (this.eyeType) {
      case EyeType.Round:
        return 'M30,40 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M70,40 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0';
      case EyeType.Slanted:
        return 'M30,40 l10,-5 l10,5 l-10,5 l-10,-5 M70,40 l10,-5 l10,5 l-10,5 l-10,-5';
      case EyeType.Square:
        return 'M25,35 h20 v10 h-20 Z M65,35 h20 v10 h-20 Z';
    }
    return ''
  }


  getMouthPath(): string {
    switch (this.mouthType) {
      case MouthType.Smile:
        return 'M30,70 q20,20 40,0';
      case MouthType.Wide:
        return 'M20,75 q30,-10 60,0';
      case MouthType.Crooked:
        return 'M30,70 l20,20 l20,-20';
    }
    return ''
  }

  getEarPath(): string {
    switch (this.earType) {
      case EarType.Triangular:
        return 'M0,40 l5,-10 l5,10 Z M90,40 l5,-10 l5,10 Z';
      case EarType.Circular:
        return 'M5,40 a5,5 0 1,0 0,10 a5,5 0 1,0 0,-10 M95,40 a5,5 0 1,0 0,10 a5,5 0 1,0 0,-10';
      case EarType.Square:
        return 'M2,35 h10 v10 h-10 Z M90,35 h10 v10 h-10 Z';
    }
    return '';
  }

  getHairPath(): string {
    switch (this.hairType) {
      case HairType.Short:
        return 'M10,5 h80 v20 h-80 Z';
      case HairType.Long:
        return 'M30,5 l20,30 l20,-30 Z';
      case HairType.Curly:
        return 'M10,5 q20,20 40,0 q20,20 40,0 M10,5 q20,0 40,20 q20,-20 40,0';
    }
    return '';
  }



}
