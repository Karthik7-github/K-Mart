const app = require('./src/app');
const ConnectionDB = require('./src/database/db');

app.listen(5000, () => {
    console.log("Server is Listening on PORT 5000...");
    ConnectionDB();
});

