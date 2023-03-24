
/**
 * This class sends the messages through the web socket to the specific client observers
 */
class MessageProcessor {

	/**
	 * It configures the message to send through the web socket
	 * @param {*} sensorTopic [topic which identifies the source of the message]
	 * @param {*} topicValues [object that registers all possible topics used by the web socket communication]
	 * @param {*} socket [web socket object]
	 * @param {*} data [received JSON message]
	 */
	static sendMessage(sensorTopic, topicValues, socket, data) {
		if(sensorTopic == topicValues.firedetection_virtual_topic) { // virtual fire detection sensor message
			socket.emit('temperature-virtual', data.temperature);
			socket.emit('humidity-virtual', data.humidity);
			socket.emit('flameDetected-virtual', data.flameDetected);
		} else if (sensorTopic == topicValues.firedetection_real_topic) { // real fire detection sensor message
			socket.emit('temperature-real', data.temperature);
			socket.emit('humidity-real', data.humidity);
			socket.emit('flameDetected-real', data.flameDetected);
		} else if (sensorTopic == topicValues.smartmeter_raw_topic) { // virtual smart meter message
			socket.emit('smartmeter-data', data);
		} else if (sensorTopic == topicValues.hive_webcam_totem_topic) {
			socket.emit('webcam-totem-tecnocentro', data);
		}
	}

}

module.exports = MessageProcessor;