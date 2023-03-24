import { Injectable }		from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from "socket.io-client";

/**
 * This class is resposible to receive all web socket messages from the server and delegate it to the view ones.
 */
@Injectable()
export class ListenerService {

	/**
	 * Constant to be configured according to the totem test or staging servers
	 */
	readonly totemSocketAddress: string = "10.146.42.210";

	/**
	 * Web socket used by the client side
	 */
	socket: any = null;

	// Subjects used to send notifications to the view classes according to its content
	private virtualTemperatureSubject = new Subject<any>();
	private realTemperatureSubject = new Subject<any>();
	private virtualHumiditySubject = new Subject<any>();
	private realHumiditySubject = new Subject<any>();
	private virtualFlameDetectionSubject = new Subject<any>();
	private realFlameDetectionSubject = new Subject<any>();
	private consumptionSubject = new Subject<any>();
	// Testing webcam
	private webcamTotemSubject = new Subject<any>();

	constructor() {
		this.startListening();
	}

	/**
	 * It starts listening to virtual temperature data
	 */
	listenToVirtualTemperatureMessages(): Observable<any> {
		return this.virtualTemperatureSubject.asObservable();
	}

	/**
	 * It starts listening to real temperature data
	 */
	listenToRealTemperatureMessages(): Observable<any> {
		return this.realTemperatureSubject.asObservable();
	}

	/**
	 * It starts listening to virtual humidity data
	 */
	listenToVirtualHumidityMessages(): Observable<any> {
		return this.virtualHumiditySubject.asObservable();
	}

	/**
	 * It starts listening to real humidity data
	 */
	listenToRealHumidityMessages(): Observable<any> {
		return this.realHumiditySubject.asObservable();
	}

	/**
	 * It starts listening to virtual flame detection data
	 */
	listenToVirtualFlameDetectionMessages(): Observable<any> {
		return this.virtualFlameDetectionSubject.asObservable();
	}

	/**
	 * It starts listening to real flame detection data
	 */
	listenToRealFlameDetectionMessages(): Observable<any> {
		return this.realFlameDetectionSubject.asObservable();
	}

	/**
	 * It starts listening to smart meter consumption data
	 */
	listenToConsumptionMessages(): Observable<any> {
		return this.consumptionSubject.asObservable();
	}

	
	// Testing webcam
	listenToWebcamTotemMessages(): Observable<any> {
		return this.webcamTotemSubject.asObservable();
	}

	/**
	 * This method is responsible for instatiating and configuring the web socket object in the client side
	 */
	startListening(): void {
		this.socket = io("http://" + this.totemSocketAddress + ":4060");
		this.socket.emit('start', '');
		
		this.socket.on('temperature-virtual', function(data:any){
			this.virtualTemperatureSubject.next(data);
		}.bind(this));

		this.socket.on('temperature-real', function(data:any){
			this.realTemperatureSubject.next(data);
		}.bind(this));

		this.socket.on('humidity-virtual', function(data:any){
			this.virtualHumiditySubject.next(data);
		}.bind(this));

		this.socket.on('humidity-real', function(data:any){
			this.realHumiditySubject.next(data);
		}.bind(this));

		this.socket.on('flameDetected-virtual', function(data:any){
			this.virtualFlameDetectionSubject.next(data);
		}.bind(this));

		this.socket.on('flameDetected-real', function(data:any){
			this.realFlameDetectionSubject.next(data);
		}.bind(this));

		this.socket.on('smartmeter-data', function(data:any){
			this.consumptionSubject.next(data);
		}.bind(this));	
		// Testing webcam
		this.socket.on('webcam-totem-tecnocentro', function(data:any){
			this.webcamTotemSubject.next(data);
		}.bind(this));	
	}
	
}