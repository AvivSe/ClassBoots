import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  institutions = [
    {
          name: "Colman",
          schools: ["Computer Science","Art","Law"]
      },
      {
          name: "IDC",
          schools: ["Art","Law"]
      },
      {
          name: "TLV",
          schools: ["Computer Science","Law"]
      },
      {
          name: "CDE",
          schools: ["Law"]
      },
      {
          name: "Colman",
          schools: ["Computer Science","Art","Law"]
      },
      {
          name: "IDC",
          schools: ["Art","Law"]
      },
      {
          name: "TLV",
          schools: ["Computer Science","Law"]
      },
      {
          name: "CDE",
          schools: ["Law"]
      },
      {
          name: "Colman",
          schools: ["Computer Science","Art","Law"]
      },
      {
          name: "IDC",
          schools: ["Art","Law"]
      },
      {
          name: "TLV",
          schools: ["Computer Science","Law"]
      },
      {
          name: "CDE",
          schools: ["Law"]
      },
      {
          name: "Colman",
          schools: ["Computer Science","Art","Law"]
      },
      {
          name: "IDC",
          schools: ["Art","Law"]
      },
      {
          name: "TLV",
          schools: ["Computer Science","Law"]
      },
      {
          name: "CDE",
          schools: ["Law"]
      },
      {
          name: "Colman",
          schools: ["Computer Science","Art","Law"]
      },
      {
          name: "IDC",
          schools: ["Art","Law"]
      },
      {
          name: "TLV",
          schools: ["Computer Science","Law"]
      },
      {
          name: "CDE",
          schools: ["Law"]
      },
      {
          name: "Colman",
          schools: ["Computer Science","Art","Law"]
      },
      {
          name: "IDC",
          schools: ["Art","Law"]
      },
      {
          name: "TLV",
          schools: ["Computer Science","Law"]
      },
      {
          name: "CDE",
          schools: ["Law"]
      }
      ];
  constructor() { }
  ngOnInit() {
  }
}
