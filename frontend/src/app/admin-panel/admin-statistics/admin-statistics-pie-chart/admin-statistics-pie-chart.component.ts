import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-admin-statistics-pie-chart',
  templateUrl: './admin-statistics-pie-chart.component.html',
  styleUrls: ['./admin-statistics-pie-chart.component.css']
})
export class AdminStatisticsPieChartComponent  {
  title = 'Pie Chart';

  POPULATION: any[] = [];

  cms: any = {
    "totalViews": 789,
    "institutions": [
      {
        "_id": "5c5868290a99b84764bae228",
        "name": "IDC Herzliya",
        "totalViews": 34,
        "schools": [
          {
            "_id": "5c6c70f65739940017e5f69c",
            "name": "economy",
            "totalViews": 30,
            "subjects": [
              {
                "_id": "5c6c71505739940017e5f69f",
                "name": "Micro",
                "totalViews": 30,
                "lectures": [
                  {
                    "_id": "5c6c71725739940017e5f6a0",
                    "name": "Micro1",
                    "totalViews": 30
                  }
                ]
              }
            ]
          },
          {
            "_id": "5c6c72055739940017e5f6a8",
            "name": "lala",
            "totalViews": 4,
            "subjects": [
              {
                "_id": "5c6c72105739940017e5f6a9",
                "name": "fvdv",
                "totalViews": 4,
                "lectures": [
                  {
                    "_id": "5c6c72315739940017e5f6ab",
                    "name": "Calculus 1",
                    "totalViews": 4
                  }
                ]
              },
              {
                "_id": "5c6c721a5739940017e5f6aa",
                "name": "fbvfd",
                "totalViews": 0,
                "lectures": []
              }
            ]
          }
        ]
      },
      {
        "_id": "5c5868350a99b84764bae229",
        "name": "Shenkar",
        "totalViews": 0,
        "schools": [
          {
            "_id": "5c68630ff78edb001728cb08",
            "name": "Law2",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c6c72a45739940017e5f6b7",
            "name": "psychology",
            "totalViews": 0,
            "subjects": [
              {
                "_id": "5c6c72ca5739940017e5f6b9",
                "name": "bnh",
                "totalViews": 0,
                "lectures": [
                  {
                    "_id": "5c6c72d25739940017e5f6ba",
                    "name": "hnvhn",
                    "totalViews": 0
                  }
                ]
              }
            ]
          },
          {
            "_id": "5c6c72a95739940017e5f6b8",
            "name": "Computer Science",
            "totalViews": 0,
            "subjects": []
          }
        ]
      },
      {
        "_id": "5c5868410a99b84764bae22a",
        "name": "Technion",
        "totalViews": 0,
        "schools": []
      },
      {
        "_id": "5c58684d0a99b84764bae22b",
        "name": "Ben Gurion",
        "totalViews": 0,
        "schools": [
          {
            "_id": "5c6ee43042fe09001774c602",
            "name": "123",
            "totalViews": 0,
            "subjects": [
              {
                "_id": "5c76a8f2b0edaf0017886a03",
                "name": "Micro",
                "totalViews": 0,
                "lectures": [
                  {
                    "_id": "5c76a923b0edaf0017886a04",
                    "name": "shir",
                    "totalViews": 0
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "_id": "5c5868040a99b84764bae227",
        "name": "Colman",
        "totalViews": 755,
        "schools": [
          {
            "_id": "5c66bfee4e161d0017639acd",
            "name": "Computer Science",
            "totalViews": 691,
            "subjects": [
              {
                "_id": "5c66bffa4e161d0017639ace",
                "name": "infi2",
                "totalViews": 691,
                "lectures": [
                  {
                    "_id": "5c66c0d937893c001706e30f",
                    "name": " Root 2 Irrational",
                    "totalViews": 687
                  },
                  {
                    "_id": "5c66d90437893c001706e310",
                    "name": "bbgfgbfgb",
                    "totalViews": 4
                  },
                  {
                    "_id": "5c66d96437893c001706e311",
                    "name": "sacsa",
                    "totalViews": 0
                  },
                  {
                    "_id": "5c66d98937893c001706e312",
                    "name": "ascsacs",
                    "totalViews": 0
                  },
                  {
                    "_id": "5c759f2fea52c300177ff2e9",
                    "name": "ascasc",
                    "totalViews": 0
                  },
                  {
                    "_id": "5c759f39ea52c300177ff2ea",
                    "name": "csacascascasc",
                    "totalViews": 0
                  },
                  {
                    "_id": "5c766c066d61670017d5d0b5",
                    "name": "bgfbfgb",
                    "totalViews": 0
                  }
                ]
              },
              {
                "_id": "5c6936b8ad4d5e001778d2f4",
                "name": "bfgbgfb",
                "totalViews": 0,
                "lectures": []
              },
              {
                "_id": "5c72d83cfd92170017c729a4",
                "name": "sdcdsc",
                "totalViews": 0,
                "lectures": []
              },
              {
                "_id": "5c72d840fd92170017c729a5",
                "name": "sdcsddcs",
                "totalViews": 0,
                "lectures": []
              },
              {
                "_id": "5c759a2c8697dd0017f6e99d",
                "name": "csacsa",
                "totalViews": 0,
                "lectures": []
              },
              {
                "_id": "5c759eebea52c300177ff2e8",
                "name": "ascacsa",
                "totalViews": 0,
                "lectures": []
              }
            ]
          },
          {
            "_id": "5c6c66575739940017e5f68b",
            "name": "cxcxcx",
            "totalViews": 57,
            "subjects": [
              {
                "_id": "5c6c6e715739940017e5f690",
                "name": "Calculus 1",
                "totalViews": 57,
                "lectures": [
                  {
                    "_id": "5c6c6f3c5739940017e5f693",
                    "name": "Calculus 1",
                    "totalViews": 36
                  },
                  {
                    "_id": "5c6c70275739940017e5f696",
                    "name": "Calculus 2",
                    "totalViews": 21
                  }
                ]
              },
              {
                "_id": "5c6c6e975739940017e5f691",
                "name": "Calculus 2",
                "totalViews": 0,
                "lectures": []
              },
              {
                "_id": "5c6c6eab5739940017e5f692",
                "name": "Calculus 3",
                "totalViews": 0,
                "lectures": []
              }
            ]
          },
          {
            "_id": "5c6c66a05739940017e5f68c",
            "name": "psychology",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c6c66bd5739940017e5f68d",
            "name": "economy",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c6c67095739940017e5f68e",
            "name": " Behavioral Sciences",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c6c67145739940017e5f68f",
            "name": "Sentences",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c72d7cafd92170017c7299f",
            "name": "Discrete mathematics",
            "totalViews": 7,
            "subjects": [
              {
                "_id": "5c72d847fd92170017c729a6",
                "name": "Computer Science",
                "totalViews": 7,
                "lectures": [
                  {
                    "_id": "5c72d891fd92170017c729a9",
                    "name": "dd",
                    "totalViews": 7
                  }
                ]
              }
            ]
          },
          {
            "_id": "5c72dd0fcb2d3f3394f9da10",
            "name": "Computer Sciencee",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c72dd0fcb2d3f3394f9da10",
            "name": "Computer Sciencee",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c72ddd4cb2d3f3394f9da11",
            "name": "Computer Science",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c72ddd4cb2d3f3394f9da11",
            "name": "Computer Science",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c7570875a3bab0017bafee2",
            "name": "s zC ",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c7599308697dd0017f6e999",
            "name": "csa",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c7599368697dd0017f6e99a",
            "name": "asc",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c759a008697dd0017f6e99b",
            "name": "cccc",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c7669aaba9a440017e08d31",
            "name": "csa",
            "totalViews": 0,
            "subjects": [
              {
                "_id": "5c7669bbba9a440017e08d32",
                "name": "csa",
                "totalViews": 0,
                "lectures": []
              }
            ]
          }
        ]
      },
      {
        "_id": "5c5d698f00e0231fd0f780c9",
        "name": "Sami",
        "totalViews": 0,
        "schools": [
          {
            "_id": "5c6c72e25739940017e5f6bb",
            "name": "Computer Science",
            "totalViews": 0,
            "subjects": [
              {
                "_id": "5c76a9a4b0edaf0017886a08",
                "name": "Micro",
                "totalViews": 0,
                "lectures": [
                  {
                    "_id": "5c76a9f1b0edaf0017886a09",
                    "name": "shir",
                    "totalViews": 0
                  }
                ]
              }
            ]
          },
          {
            "_id": "5c6c72e65739940017e5f6bc",
            "name": "psychology",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c6c72ea5739940017e5f6bd",
            "name": "economy",
            "totalViews": 0,
            "subjects": []
          }
        ]
      },
      {
        "_id": "5c72c8136b46af001744649b",
        "name": "test-2",
        "totalViews": 0,
        "schools": []
      },
      {
        "_id": "5c72c6777fc1450017ad234e",
        "name": "test-1",
        "totalViews": 0,
        "schools": []
      },
      {
        "_id": "5c72c95e6b46af00174464a3",
        "name": "test-3",
        "totalViews": 0,
        "schools": [
          {
            "_id": "5c7461f18e1bcd00175d137b",
            "name": "leenoy",
            "totalViews": 0,
            "subjects": []
          }
        ]
      },
      {
        "_id": "5c59d5f3d82ba00604955f22",
        "totalViews": 0,
        "schools": []
      },
      {
        "_id": "5c72d123d01f6e25cc2f153f",
        "name": "nir test!!!",
        "totalViews": 0,
        "schools": [
          {
            "_id": "5c6c67145739940017e5f68f",
            "name": "Sentences",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c6c67145739940017e5f68f",
            "name": "Sentences",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c6c67145739940017e5f68f",
            "name": "Sentences",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c6c67145739940017e5f68f",
            "name": "Sentences",
            "totalViews": 0,
            "subjects": []
          },
          {
            "_id": "5c6c67145739940017e5f68f",
            "name": "Sentences",
            "totalViews": 0,
            "subjects": []
          }
        ]
      }
    ]
  };
  constructor(private http: HttpClient) {
    this.cms.institutions.forEach(inst=> {
      if(inst.totalViews > 0) {
        this.POPULATION.push({age: inst.name, population: inst.totalViews});
      }
    })
  }

}
