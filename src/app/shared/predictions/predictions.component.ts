import { OnInit } from '@angular/core';
import {
    Component,
    Input,
    SimpleChanges,
    Output,
    EventEmitter,
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-predictions',
    templateUrl: 'predictions.component.html',
    styleUrls: ['predictions.component.scss'],
    animations: [
        trigger('togglePanel', [
            state('predictionsClosed', style({
                transform: 'translateY(100%)'
            })),
            state('predictionsOpened', style({
                transform: 'translateY(0)'
            })),
            transition('predictionsClosed => predictionsOpened', animate('200ms ease-in')),
            transition('predictionsOpened => predictionsClosed', animate('200ms ease-out')),
        ]),
        trigger('togglePrediction', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                animate(300, keyframes([
                    style({ opacity: 0, transform: 'translateY(100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateY(15px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
                ]))
            ])
        ])
    ]
})
export class PredictionsComponent implements OnInit {
    @Input() predictions: Array<Object>;
    @Input() state: string;
    @Output() onMenuClosed = new EventEmitter<String>();

    constructor() { }

    ngOnInit() { }

    removePrediction(index): void {
        this.predictions.splice(index, 1);
        if (this.predictions.length === 0) {
            this.onMenuClosed.emit('predictionsClosed');
        }
    }

    savePredictions(): void {
        //TODO
    }

    closeSidePanel(): void {
        this.onMenuClosed.emit('predictionsClosed');
    }

    sidePanelClosed() {
        if (this.state === 'predictionsClosed') {
            this.predictions.splice(0, this.predictions.length);
        }
    }
}
