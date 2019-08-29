import { Component, Input } from "@angular/core";
import { Park } from "src/app/models/parks.model";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
})
export class ListComponent {
    private _parkList: Park[];
    constructor() {}

    @Input() set parkList(parkList: Park[]) {
        this._parkList = parkList || [];
    }

    get parkList() {
        return this._parkList;
    }
}
