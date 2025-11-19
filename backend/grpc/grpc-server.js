const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('./protos/user.proto', {});
const userProto = grpc.loadPackageDefinition(packageDef).user;

let subscribers = [];

function UserConnectedStream(call) {
  subscribers.push(call); // ajoute le client au flux
  call.on('cancelled', () => {
    subscribers = subscribers.filter(c => c !== call);
  });
}

// Fonction simple pour envoyer le nom d'un utilisateur
function notifyUserConnected(username) {
  subscribers.forEach(call => call.write({ username }));
}

function start() {
  const server = new grpc.Server();
  server.addService(userProto.UserService.service, { UserConnectedStream });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("User gRPC server running on 50051");
  });
}

module.exports = { start, notifyUserConnected };  