import { Component } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";
import * as chartsData from '../../shared/data/chartjs';
import * as bitcoinData from '../../shared/data/bitcoin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';

import * as moment from 'moment';

declare var require: any;
const data: any = require('../../shared/data/chartist.json');

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component {

  bitcoinPrice = 0;

    // Line chart configuration Starts
    lineChart: Chart = {
        type: 'Line', data: data['LineDashboard'],
        options: {
            axisX: {
                showGrid: false
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                low: 0,
                high: 30000,
                offset: 0,
            },
            fullWidth: true,
            offset: 0,
        },
        events: {
            draw(data: any): void {
                var circleRadius = 4;
                if (data.type === 'point') {
                    var circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: circleRadius,
                        class: 'ct-point-circle'
                    });

                    data.element.replace(circle);
                }
                else if (data.type === 'label') {
                    // adjust label position for rotation
                    const dX = data.width / 2 + (30 - data.width)
                    data.element.attr({ x: data.element.attr('x') - dX })
                }
            }
        },

    };
    // Line chart configuration Ends

    // Donut chart configuration Starts
    DonutChart: Chart = {
        type: 'Pie',
        data: data['donutDashboard'],
        options: {
            donut: true,
            startAngle: 0,
            labelInterpolationFnc: function (value) {
                var total = data['donutDashboard'].series.reduce(function (prev, series) {
                    return prev + series.value;
                }, 0);
                return '$' + total;
            }
        },
        events: {
            draw(data: any): void {
                if (data.type === 'label') {
                    if (data.index === 0) {
                        data.element.attr({
                            dx: data.element.root().width() / 2,
                            dy: data.element.root().height() / 2
                        });
                    } else {
                        data.element.remove();
                    }
                }

            }
        }
    };
    // Donut chart configuration Ends

    // balances: Array<{ label: string, value: number }> = [
    //     {
    //         label: 'Bitcoin',
    //         value: 0
    //     },
    //     {
    //         label: 'Ethereum',
    //         value: 0
    //     },
    //     {
    //         label: 'Bitcoin Cash',
    //         value: 0
    //     },
    //     {
    //         label: 'Total Balance',
    //         value: 0
    //     }

    // ];



    packages: Array<{ label: string, value: number }> = [
        {
            label: 'Starter',
            value: 500
        },
        {
            label: 'Starter Plus',
            value: 1000
        },
        {
            label: 'Intermediate',
            value: 2500
        },
        {
            label: 'Titanium',
            value: 5000
        },
        {
            label: 'Gold',
            value: 10000
        },
        {
            label: 'Platinum',
            value: 25000
        },
        {
            label: 'Diamond',
            value: 50000
        },
        {
            label: 'Black Diamond',
            value: 100000
        }

    ];

    today: any;
    previousDayOfMonth: any;

    constructor(private modalService: NgbModal,
                private http: Http) {
        this.today = moment().format('YYYY-MM-DD');
        this.previousDayOfMonth = moment(this.today).subtract(7, 'days').format('YYYY-MM-DD');

        this.http.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.previousDayOfMonth}&end=${this.today}&currency=USD`)

        // this.http.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-1-12&end=2018-5-01&currency=PHP`)


                .subscribe((res: any) => {
                    res = res.json();
                    // const prices = Object.entries(res.bpi);
                    // prices.forEach(price => {
                    //     result.labels.push(moment(price[0]).format('MMM D, YYYY'));
                    //     result.series.push(price[1]);
                    // });
                    // result.series = [result.series];
                    // console.log(result)
                    // console.log(JSON.stringify(result))
                    // this.lineChart.data = result;

                    let labels = Object.keys(res.bpi)
                    console.log(labels);

                    labels = labels.map(x=> {
                        return moment(x).format('MM/DD');
                    })

                    let series = this.flatten(res.bpi);
                    console.log(series);

                    console.log(series[series.length-1]);

                    this.bitcoinPrice = series[series.length-1];



                    let result = {"labels": labels, "series": [series]};

                    console.log(JSON.stringify(result));

                    this.lineChart.data = result;


                })
    }
 // lineChart
 public lineChartData = chartsData.lineChartData;
 public lineChartLabels = chartsData.lineChartLabels;
 public lineChartOptions = chartsData.lineChartOptions;
 public lineChartColors = chartsData.lineChartColors;
 public lineChartLegend = chartsData.lineChartLegend;
 public lineChartType = chartsData.lineChartType;

 // areaChart
 public areaChartData = chartsData.areaChartData;
 public areaChartLabels = chartsData.areaChartLabels;
 public areaChartOptions = chartsData.areaChartOptions;
 public areaChartColors = chartsData.areaChartColors;
 public areaChartLegend = chartsData.areaChartLegend;
 public areaChartType = chartsData.areaChartType;

    flatten(obj) {
    return Object.keys(obj).reduce(function(previous, current) {
        previous.push(obj[current]);
        return previous;
    }, []);
    }


    open(template) {
        this.modalService.open(template);
    }
}
