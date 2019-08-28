import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import {} from "googlemaps";
@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: [],
})
export class MapComponent implements OnInit {
    @ViewChild("mapContainer", { static: true }) mapElement: any;
    map: google.maps.Map;
    @Output() notifyMapChange = new EventEmitter();
    private _mapProperties: google.maps.MapOptions;
    constructor() {}

    @Input() set mapProperties(mapProperties: google.maps.MapOptions) {
        this._mapProperties = mapProperties;
    }

    get mapProperties(): google.maps.MapOptions {
        return this._mapProperties;
    }

    ngOnInit(): void {
        this.generateMap();
    }

    protected generateMap(): void {
        this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            this.mapProperties
        );
        this.notifyMapChange.emit(this.map);
    }
}
