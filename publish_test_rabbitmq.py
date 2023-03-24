#!/usr/bin/env python
import pika
import random
import time

def gerarDados():
    input = random.randint(2, 10)
    output = random.randint(0, 2)
    qtd_pessoas= random.randint(10,20)
    pico = random.randint(50,60)
    return '{"input":'+ str(input) +', "output":'+ str(output) +', "present":'+ str(qtd_pessoas) +', "peak":'+ str(pico) +'}'

# credentials = pika.PlainCredentials(username='livinglab', password='livinglab')
# connection = pika.BlockingConnection(pika.ConnectionParameters(host='10.146.42.210', credentials=credentials))

credentials = pika.PlainCredentials(username='guest', password='guest')
connection = pika.BlockingConnection(pika.ConnectionParameters(host='127.0.0.1', credentials=credentials))

channel = connection.channel()

channel.exchange_declare(exchange='amq.topic', exchange_type='topic', durable=True)

routing_key = 'livinglab.sensor.hive.raw.real.webcam-totem-tecnocentro'

while True:
    messageJson = gerarDados()

    channel.basic_publish(exchange='amq.topic', routing_key=routing_key, body=str(messageJson))
    
    print(" [x] Sent %r:%r" % (routing_key, messageJson))
    time.sleep(5)

connection.close()