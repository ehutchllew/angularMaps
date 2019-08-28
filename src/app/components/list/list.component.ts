import { Component, Input, OnInit } from "@angular/core";
import { PlaceResult } from "src/app/models/googlePlaces.model";
import { Park } from "src/app/models/parks.model";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
    private _parkList: Park[];
    constructor() {}

    @Input() set parkList(parkList: Park[]) {
        this._parkList = parkList;
    }

    get parkList() {
        return this._parkList;
    }

    ngOnInit() {
        console.log(this.parkList);
    }
}
