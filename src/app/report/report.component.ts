import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartTitleOptions, ChartLegendOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
import { ProcessdataService } from '../processdata.service';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  pieChartOptions1: ChartOptions;
  pieChartOptions2 : ChartOptions;
  pieChartOptions3 : ChartOptions;
  pieChartOptions4  : ChartOptions;
  pieChartData: SingleDataSet;
  pieChartData2: SingleDataSet;
  pieChartData3: SingleDataSet;
  pieChartData4: SingleDataSet;
  pieChartType: ChartType;
  pieChartLegend: boolean;
  pieChartPlugins = [];
  pieChartLabels: Label[];
  pieChartLabels2: Label[];
  pieChartLabels3: Label[];
  pieChartLabels4: Label[];
  average : number;
  carefuel : number;
  chartReady = false;

  constructor(private processdataService:ProcessdataService){}

  ngOnInit() {


    this.pieChartOptions1 = this.createOptions("PARTICIPANTS");
    this.pieChartOptions2 =  this.createOptions("DRIVE TRAIN PREFERENCE");
    this.pieChartOptions3 = this.createOptions("CAR MODEL");
    this.pieChartOptions4 = this.createOptions("CAR TYPE");

    this.pieChartLabels = ['Adolescents', 'Unlicensed', 'First-timers','Targetables'];
    this.pieChartLabels2 = ['FWD', 'RWD', 'I dont Know'];
    this.pieChartLabels3 = ['BMW', 'Lamborghini', 'Ford','Audi','Others'];
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.pieChartPlugins = [pluginLabels];

    
    this.processdataService.getJSON().subscribe(
      data =>{
        this.pieChartData = [data.adolescents, data.unlicensed, data.firsttimers,data.targetables];
        this.pieChartData2 = [data.FWD,data.RWD,data.IDK]
        this.pieChartData3 = data.carmake
        this.average = data.AvgCars
        this.carefuel = (data.carefuel/data.targetables) * 100
        var temp = this.getCarModel(data.carmodel);
        this.pieChartLabels4= Object.keys(temp); 
        this.pieChartData4= Object["values"](temp);
        this.chartReady = true;
      }
    )
  }

  private createOptions(title): ChartOptions {
    return {
          responsive: true,
          maintainAspectRatio: true,
          title: this.createChartTitle(title),
          legend: this.styleLegend(),
          plugins: {
              labels: {
                render: 'percentage',
                precision: 2
              }
            }
    };
  }

  private styleLegend(): ChartLegendOptions {
    return {
      position : "top",
    }
  }

  private createChartTitle(mytitle) :ChartTitleOptions {
    return {
      text : mytitle,
      display: true
    }
  }

   private getCarModel(carModel) : []
   {
    const occurrences = carModel.reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});
   
    return occurrences;
   }


}

