import { Component, Input, OnInit } from "@angular/core";
import { PlaceResult } from "src/app/models/googlePlaces.model";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
    private _parkList: PlaceResult[];
    constructor() {}

    @Input() set parkList(parkList: PlaceResult[]) {
        this._parkList = parkList;
    }

    get parkList() {
        return this._parkList;
    }

    ngOnInit() {
        console.log(this.parkList);
    }
}
