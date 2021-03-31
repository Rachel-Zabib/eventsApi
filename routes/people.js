var express = require('express');
var router = express.Router();
let peopleController=require("../controllers/peopleController")

/* GET users listing. */
router.get('/',peopleController.index );
// router.get('/:id',peopleController.getOne );
// router.post('/',peopleController.addOne );
// router.put('/:id',peopleController.edit );
// router.delete('/:id',peopleController.delete );


module.exports = router;
