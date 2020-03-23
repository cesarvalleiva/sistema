
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';

mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbsistema';

// process.env.DBR
mongoose.connect(dbUrl, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
.then(mongoose => console.log('Se ha conectado a la BD en el puerto 27017'))
.catch(err => console.log(err)); 

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/api', router);

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server on port' + app.get('port'));
});