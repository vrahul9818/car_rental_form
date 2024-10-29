const express = require('express');
const app = express();
const routes = require('./routers/index');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { sequelize: db } = require('./models');
const { up: seedVehicles } = require('./seeders/20241028213906-seed-vehicles');
const DB_NAME = 'sql12741568';
const PORT = process.env.PORT || 5050;

let DATABASE_URL=`mysql://sql12741568:NYwAZdInfy@sql12.freesqldatabase.com:3306/sql12741568`;

const rootSequelize = new Sequelize(DATABASE_URL, {
    logging: false,
  });


// const rootSequelize = new Sequelize('mysql://root:@localhost:3306', {
//   logging: false,
// });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', routes);

async function checkAndSetupDatabase() {
  try {
    // Test the connection to MySQL server
    await rootSequelize.authenticate();
    console.log('Connected to MySQL server.');

    // Check if the database exists
    const [results] = await rootSequelize.query(
      `SHOW DATABASES LIKE '${DB_NAME}'`
    );
    if (results.length === 0) {
      await rootSequelize.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database ${DB_NAME} created successfully.`);
    } else {
      console.log(`Database ${DB_NAME} already exists.`);
    }

    // Ensure the application sequelize instance points to the newly created database
    await db.authenticate();
    console.log(`Connected to database: ${DB_NAME}.`);
    await db.sync();

    //sync seeder
    const vehicleCount = await db.query('SELECT COUNT(*) AS count FROM Vehicles', {
      type: Sequelize.QueryTypes.SELECT,
    });
    console.log(vehicleCount);

    

    // If empty, run the seeder
    if (vehicleCount[0].count === 0) {
      await seedVehicles(db.getQueryInterface(), Sequelize);
      console.log('Seeder data inserted successfully.');
    } else {
      console.log('Vehicles table already populated. Skipping seeder.');
    }

    console.log('Database tables are set up successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Check and setup the database on startup
checkAndSetupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


