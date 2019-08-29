import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Park } from "src/app/models/parks.model";

@Component({
    selector: "app-list-item",
    templateUrl: "./list-item.component.html",
    styleUrls: ["./list-item.component.scss"],
})
export class ListItemComponent implements OnInit {
    @Input() listItem: Park;
    @Input() name: string;
    @ViewChild("photo", { static: true }) mapElement: any;
    public photo =
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    constructor() {}

    ngOnInit() {
        if (this.listItem.result.photos) {
            this.parsePhoto();
        }
    }

    public onClickItem(listItem: Park) {
        google.maps.event.trigger(listItem.marker, "click");
    }

    protected parsePhoto() {
        this.photo = this.listItem.result.photos[0].getUrl({});
    }
}
