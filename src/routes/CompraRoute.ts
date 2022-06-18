import { Router } from 'express'
import CompraController from '../controller/CompraController'

const router = Router()

router.route('/compra')
  .get(CompraController.testing)
  .post(CompraController.comprar)

export default router
