require('socket.io');

var MessageBrokerListener = require(__dirname + '/communication/MessageBrokerListener');
var config = require('getconfig');

/**
 * Intermediate all client requests.
 */
 class ApplicationManager {

 	constructor() { }

	/**
	 * This method prepares the server to receive web socket messages
	 * @param {*} io [the web socket object]
	 */
 	startBrokerListeners(io) {
 		io.set("origins", "*:*");
		io.on('connection', function(socket){
			socket.on('start', function(m){
				var amqpUrl = "amqp://" + config.broker_user + ":" + config.broker_password + "@" + config.broker_address;
				// It prepares the listening process to all raw data sensor topics
				MessageBrokerListener.listenToSensorMessages(config.firedetection_virtual_topic, socket);
				MessageBrokerListener.listenToSensorMessages(config.firedetection_real_topic, socket);
				MessageBrokerListener.listenToSensorMessages(config.smartmeter_raw_topic, socket);
				// Testing Hive
				MessageBrokerListener.listenToSensorMessages(config.hive_webcam_totem_topic, socket);
			});
		});
 	}

}

module.exports = ApplicationManager;