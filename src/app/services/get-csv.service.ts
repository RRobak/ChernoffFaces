import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
interface MyObject {
  [key: string]: any;
}
class dataObject{
  label:string[]=[];
  items:number[][]=[[]];
  voivodeship:string[]=[];
}

class facesData{
  label:string='';
  parameterName:string[]=[];
  parameterValue:number[]=[];
}

class minMaxParam{
  paramName:string='';
  voivodeship:string[]=[];
}

@Injectable({
  providedIn: 'root'
})
export class GetCSVService {
  label:string[]=[];
  items:number[][]=[[]];
  voivodeship:string[]=[];
  constructor(private http:HttpClient) {
  }
  getData(){
    return this.http.get('/assets/data.csv', { responseType: 'text/csv' as 'text' }).pipe(
      map(data=> {
        const lines = data.split('\n')
        let names=lines[0].split(';')
        names.pop();
        for(let i=2;i<names.length;i+=3)
        {
          this.label.push(names[i]+' '+names[i+1]+' '+names[i+2])
        }

        for(let i=1;i<lines.length-1;i++)
        {
          this.items[i - 1] = this.items[i - 1] || [];
          const line=lines[i].split(';')
          this.voivodeship[i-1]=line[1]
          for(let j=2;j<line.length;j++)
          {
            line[j]=line[j].replace(',','.')
            this.items[i-1][j-2]=parseFloat(line[j])
          }
        }
        let response=new dataObject();
        response.items=this.items
        response.label=this.label
        response.voivodeship=this.voivodeship
        let faces=this.processData(response)
        return faces
      })
    )
  }
  processData(response:dataObject):minMaxParam[]{
    let faces=[new facesData()];
    for(let i=1;i<17;i++)
    {
      // console.log(i)
      faces[i-1]=new facesData();
      faces[i-1].label=response.voivodeship[i];
      let parameterNames=[];
      for(let j=1;j<=(response.label.length/30);j++)
      {
        const indexOfOne = response.label[(j-1)*30].indexOf('1');
        let stringProcessed;
        if (indexOfOne !== -1) {
          stringProcessed=response.label[(j-1)*30].substring(1, indexOfOne-1);
        } else {
          stringProcessed= response.label[(j-1)*30];
        }
        // console.log(stringProcessed)
        parameterNames[j-1]=stringProcessed;
      }
      faces[i-1].parameterName=parameterNames
      let parameterValues=[];

        for (let j = 1; j <= (response.label.length / 30); j++) {
          let count = 0
          let items = 0;
          for (let k = ((j - 1) * 30); k < ((j) * 30); k++) {
            count += response.items[i-1][k];
            items++;
          }
          // console.log(((j-1)*30))
          // console.log(((j)*30))
          parameterValues[j - 1] = Math.round((count / items) * 100) / 100;
        }
        faces[i - 1].parameterValue = parameterValues;
    }
    return this.findMinMaxParam(faces);
  }

  findMinMaxParam(faces:facesData[]):minMaxParam[]{
    let minMaxParams=[];
    let minMaxP=new minMaxParam();
    for(let i=0;i<5;i++)
    {
      faces.sort((a, b) => a.parameterValue[i] - b.parameterValue[i]);
      minMaxP=new minMaxParam();
      minMaxP.paramName=faces[0].parameterName[i]
      for(let j=0;j<16;j++){
        minMaxP.voivodeship.push(faces[j].label)
      }
      minMaxParams.push(minMaxP)
    }
  return minMaxParams
  }

}
