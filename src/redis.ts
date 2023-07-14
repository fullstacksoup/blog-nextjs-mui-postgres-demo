import Redis from 'ioredis';
const redis = new Redis(process.env.KV_URL);

export default redis;


// new Redis(); // Connect to 127.0.0.1:6379
// new Redis(6380); // 127.0.0.1:6380
// new Redis(6379, "192.168.1.1"); // 192.168.1.1:6379
// new Redis("/tmp/redis.sock");
// new Redis({
//   port: 6379, // Redis port
//   host: "127.0.0.1", // Redis host
//   username: "default", // needs Redis >= 6
//   password: "my-top-secret",
//   db: 0, // Defaults to 0
// });