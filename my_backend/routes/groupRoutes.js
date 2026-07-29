import express from 'express'


import protect from '../middlewares/authMiddleware.js'

import { Accept, CreateGroup, findGroup, findJoinedGroups, getEligibleMembers, inviteUserToGroup, pendingInvites, Reject, updateExistingGroup } from '../controller/groupController.js'

const router =express.Router()

router.post('/createGroup',protect,CreateGroup)
router.post('/accept',protect,Accept)
router.post('/reject',protect,Reject)
router.post('/invite',protect,inviteUserToGroup)

router.get('/pendingInvites',protect,pendingInvites)
router.get('/eligible/:groupId',protect,getEligibleMembers)
router.get('/findJoinedGroups',protect,findJoinedGroups)
router.get('/findGroup',protect,findGroup)


router.put('/updateGroup',protect,updateExistingGroup)

export default router