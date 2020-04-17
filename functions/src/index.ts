//firebase config
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// const db = admin.firestore();

//sendgrid config
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);


//functions
export const newTurno = functions.firestore.document('turnos/{turnoId}').onCreate(async (change, context) => {
    // const turnoSnapshot = await db.collection('turno').doc(context.params.turnoId).get();
    // const turno = turnoSnapshot.data() || {};

    const msg =  {
        to: 'agus.sicsic.aaa@gmail.com',
        from: 'szyagustin@gmail.com',
        templateId: TEMPLATE_ID,
        subject: 'turrrrr'
    }

    return sgMail.send(msg);
});


//arriba si tenes data que se recibe en el template qe se 
//tiene que llenar dinamicamente, agregas una key al msg 
//llamada dinamic_template_data, que es igual a un nuevo json, 
//con cada una de las variables que recibe como keys, y values sus valores.
