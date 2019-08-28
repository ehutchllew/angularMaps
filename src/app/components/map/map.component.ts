import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import {} from "googlemaps";
import { Map, MapOptions } from "src/app/models/googlePlaces.model";
@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: [],
})
export class MapComponent implements OnInit {
    @ViewChild("mapContainer", { static: true }) mapElement: any;
    map: Map;
    @Output() notifyMapChange = new EventEmitter();
    private _mapProperties: MapOptions;
    constructor() {}

    @Input() set mapProperties(mapProperties: MapOptions) {
        this._mapProperties = mapProperties;
    }

    get mapProperties(): MapOptions {
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
