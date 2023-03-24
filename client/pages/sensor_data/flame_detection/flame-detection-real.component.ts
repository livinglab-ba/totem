import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ListenerService } 		from '../listener.service';

@Component({
    selector:'flame-detection-real',
    template: require('./flame-detection-real.component.html')
})

/**
 * View class for real flame detection sensor data
 */
export class RealFlameDetectionComponent implements OnInit, OnDestroy {

	/**
	 * Object wich presents the sensor data to the user
	 */
	data: any;

	/**
	 * Object which observes new incoming sensor data
	 */
	subscription: Subscription;

	constructor(
    	private listenerService: ListenerService
	) {}

	/**
	 * It sets the default values presented to the user 
	 * and subscribes to the web socket data, updating the view content once any data arrives
	 */
	ngOnInit() {
		this.data = false;
		this.subscription = this.listenerService.listenToRealFlameDetectionMessages()
			.subscribe((message:any) => this.data = message);
	}

	/**
	 * It unsubscribes to the web socket data
	 */
	ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

}