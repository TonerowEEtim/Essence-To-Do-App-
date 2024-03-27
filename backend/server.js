const path = require('path')
const express = require('express');
const connectDBMongo = require('./config/dal')
const { errorHandler } = require('./middleware/errorMiddleware');
var cors = require('cors')

const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;



const app = express();
connectDBMongo();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/todos', require('./routes/todoRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
//serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
  
} else {
  app.get('/',(req,res)=>res.send('please set production'))
  
}



app.use(errorHandler);

app.listen(port, () => { console.log(`app is listening in port ${port}`) });