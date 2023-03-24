import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgxCarousel } from 'ngx-carousel';
import { ListenerService } 		from '../listener.service';

@Component({
    selector:'consumption',
	template: require('./consumption.component.html'),
})

/**
 * View class for smart meter consumption data
 */
export class ConsumptionComponent implements OnInit, OnDestroy {

	/**
	 * Object wich presents the sensor data to the user
	 */
	data: any;

	/**
	 * Object which observes new incoming sensor data
	 */
	subscription: Subscription;

	/**
	 * Variable indicating if there is new incoming data from the server 
	 */
	newData: boolean = false;

	/**
	 * It stores the number of appliances in a smart meter
	 */
	numberOfAppliances: number;

	/**
	 * The sum of consumption from all smart meter appliances
	 */
	totalConsumption: number;

	/**
	 * The smart meter name
	 */
	smartMeterName: string;

	/**
	 * Carousel view component to be configured
	 */
	carousel: NgxCarousel;

	constructor(
		private listenerService: ListenerService,
	) {
		this.data = [];
		this.numberOfAppliances = 0;
		this.totalConsumption = 0;
		this.smartMeterName = "ARGOS";
	}

	/**
	 * It sets the default values presented to the user 
	 * and subscribes to the web socket data, updating the view content once any data arrives
	 */
	ngOnInit() {
		this.subscription = this.listenerService.listenToConsumptionMessages()
			.subscribe((message:any) => this.data = this.handleConsumptionData(message));
		this.carousel = {
			grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
			slide: 1,
			speed: 400,
			interval: 7000,
			point: {
				visible: true
			},
			load: 2,
			touch: false,
			loop: true,
			custom: 'banner'
		}
	}

	/**
	 * It unsubscribes to the web socket data
	 */
	ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

	/**
	 * It converts the JSON message into an object capable of being presented in a carousel component
	 * @param message [incoming JSON message]
	 */
    handleConsumptionData(message:any) {
		this.newData = true;
    	this.numberOfAppliances = message.appliances.length;
    	this.totalConsumption = 0;
    	
    	var index;
    	for (index = 0; index < message.appliances.length; index++) { 
    		this.totalConsumption += message.appliances[index].powerInWatts;
		}

	    var rowsArray = this.splitArray(message.appliances, 2);
	    var pagesArray = this.splitArray(rowsArray, 4);
	    return pagesArray;
	}

	/**
	 * It splits one array into chunks of N size
	 * @param oldArray [previous array]
	 * @param chunk_size [the N value]
	 */
    splitArray(oldArray:any, chunk_size:number) {
	    var newArray = [];
	    var index;
	    for (index = 0; index < oldArray.length; index += chunk_size) {
	        var chunk = oldArray.slice(index, index+chunk_size);
	        newArray.push(chunk);
	    }
	    return newArray;
    }

}