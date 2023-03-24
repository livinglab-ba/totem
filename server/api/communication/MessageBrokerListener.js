// Install the AMQPlib package beforehand: npm install amqplib
var amqp = require('amqplib/callback_api');

// Building amqp url
var config = require('getconfig'); // It reads the config file named default.json in the config folder
var amqpUrl = "amqp://" + config.broker_user + ":" + config.broker_password + "@" + config.broker_address;

var MessageProcessor = require(__dirname + '/MessageProcessor');

class MessageBrokerListener {

  /**
   * It starts listening to the message broker topic
   * @param {*} sensorTopic [topic to be listened]
   * @param {*} socket [web socker object used to send client notifications]
   */
  static listenToSensorMessages(sensorTopic, socket) {

    /**
     * Creating a RabbitMQ connection.
     *
     * @{Tutorial: @link https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html}
     * 
     * @param  {[type]} err            [description]
     * @param  {String} channel)       {                                    var exchange [description]
     * @param  {[type]} options.noAck: true          [description]
     * @return {[type]}                [description]
     */
    amqp.connect(amqpUrl, function(err, conn) {

      if (conn) {
        conn.createChannel(function(err, channel) {

          // it has to remain unchanged
          var exchange = 'amq.topic';

          channel.assertExchange(exchange, 'topic', {durable: true});

          channel.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(' ');
            console.log(" [*] Listening to " + amqpUrl + " on the topic " + sensorTopic + ". Waiting for messages.");

            channel.bindQueue(q.queue, exchange, sensorTopic);

            // this is where you implement what to do with the received messages (ex.: a sensor information response message)
            channel.consume(q.queue, function(msg) {
              console.log(" [*] Message received from the [RoutingKey]: '" + msg.fields.routingKey + "' with the message: ");
              console.log("_______________");
              var msgJSON = JSON.parse(msg.content.toString());
              console.log(msgJSON);
              MessageProcessor.sendMessage(sensorTopic, config, socket, msgJSON);
              console.log("_______________");
            }, {noAck: true});

          });
        });

        conn.on('close', function connectionClose() {
          console.log('Connection closed');
        });
      } else {
          console.log("Connection not established.");
      }

    });
  }
}

module.exports = MessageBrokerListener;