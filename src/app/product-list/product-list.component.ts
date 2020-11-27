import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { products } from "../products";
import { antPath } from "leaflet-ant-path";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  map: any;

  mainArr = [
    { Latitude: "34.923578", Longitude: "-19.873173" },
    { Latitude: "34.921588", Longitude: "-19.8738" },
    { Latitude: "34.912552", Longitude: "-19.875717" },
    { Latitude: "34.879562", Longitude: "-19.88046" },
    { Latitude: "34.879562", Longitude: "-19.88046" }
  ];

  ngOnInit(): void {
    this.map = L.map("map").setView([34.923578, -19.873173], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.LoadItemMap(this.mainArr, "Kishore");
  }

  private LoadItemMap(
    mainArr: { Latitude: string; Longitude: string }[],
    vesselName: string
  ) {
    this.map = L.map("map").setView(
      [mainArr[0].Latitude, mainArr[0].Longitude],
      3
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([mainArr[0].Latitude, mainArr[0].Longitude])
      .bindPopup(vesselName)
      .addTo(this.map);

    for (let i = 0; i < mainArr.length - 1; i++) {
      if (i < mainArr.length - 1) {
        antPath(
          [
            [mainArr[i].Latitude, mainArr[i].Longitude],
            [mainArr[i + 1].Latitude, mainArr[i + 1].Longitude]
          ],
          { color: "#FF0000", weight: 5, opacity: 0.6 }
        ).addTo(this.map);
      }
    }
  }
}
