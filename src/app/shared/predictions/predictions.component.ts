import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-predictions',
    templateUrl: 'predictions.component.html',
    styleUrls: ['predictions.component.scss']
})
export class PredictionsComponent {
    @Input() predictions: Array<Object>;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }
}
