import { Router } from 'express'
import CompraController from '../controller/CompraController'

const router = Router()

router.route('/compra')
  .get(CompraController.testing)

export default router
