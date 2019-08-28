import { Component, Input, OnInit } from "@angular/core";
import { PlaceResult } from "src/app/models/googlePlaces.model";

@Component({
    selector: "app-list-item",
    templateUrl: "./list-item.component.html",
    styleUrls: ["./list-item.component.scss"],
})
export class ListItemComponent implements OnInit {
    @Input() list: PlaceResult;
    @Input() name: string;
    constructor() {}

    ngOnInit() {
        console.log(this.list);
    }
}
