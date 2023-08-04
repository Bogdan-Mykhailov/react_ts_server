'use strict';

import express from 'express';

const PORT = 4000;
const createServer = () => {
  const app = express();

  app.use((req, res) => {
    res.send('Hello World');
  });

  return app;
};

createServer().listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
