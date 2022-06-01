import { createRecord, findAllRecords, findOneRecord, updateRecord, deleteRecord, deleteAllRecords} from '../controllers/record-controller.mjs'
import { verifyToken } from '../middlewares/auth-jwt.mjs'

export default function(router)
{
  router.post('/record', [verifyToken], createRecord)

  router.get('/records', [verifyToken], findAllRecords)

  router.get('/record/:id', [verifyToken], findOneRecord)

  router.put('/record/:id', [verifyToken], updateRecord)

  router.delete('/record/:id', [verifyToken], deleteRecord)

  router.delete('/records', [verifyToken], deleteAllRecords)
}
