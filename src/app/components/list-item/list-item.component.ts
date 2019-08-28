import { Component, Input } from "@angular/core";
import { Park } from "src/app/models/parks.model";

@Component({
    selector: "app-list-item",
    templateUrl: "./list-item.component.html",
    styleUrls: ["./list-item.component.scss"],
})
export class ListItemComponent {
    @Input() listItem: Park;
    @Input() name: string;
    constructor() {}

    public onClickItem(listItem: Park) {
        google.maps.event.trigger(listItem.marker, "click");
    }
}
