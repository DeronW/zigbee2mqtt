const iot = require('alibabacloud-iot-device-sdk');
const logger = require('./util/logger');

// xiaomi_devices:
//   sw2:
//     key: DtxwmXx1zASeogIJoMJZ
//     name: a1vtoP20ZOM
//     secret: 2jC4lTbHpe6VUplxbHaQesaAaPyxA6dw

const WS2 = {
  deviceName : 'DtxwmXx1zASeogIJoMJZ',
  productKey: 'a1vtoP20ZOM',
  deviceSecret: '2jC4lTbHpe6VUplxbHaQesaAaPyxA6dw',
}

class Aliiot {
    constructor(){
        this.devices = []
        
        // this.onConnect = this.onConnect.bind(this);
        // this.onMessage = this.onMessage.bind(this);
    }
    connect(){
        logger.info('Connected to Ali IoT server');
        let {productKey, deviceName, deviceSecret} = WS2;
        
        const device = iot.device({
          productKey,
          deviceName,
          deviceSecret,
        });

                
        device.subscribe(`/${productKey}/${deviceName}/get`);
        device.on('connect', () => {
          console.log('connect successfully!');
          device.publish(`/${productKey}/${deviceName}/update`, 'hello world!');
        });
        device.on('message', (topic, payload) => {
          console.log(topic, payload.toString());
        });

        this.devices.push(device)
    }
    
}


a = new Aliiot()
a.connect()