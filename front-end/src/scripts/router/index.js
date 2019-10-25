import SMERouter from 'sme-router';
import { home } from '../controllers/home';
import {position} from '../controllers/position'
import {form} from '../controllers/form'
const router = new SMERouter('page-wrapper');

router.route('/home', home);

router.route('/position', position);

router.route('/form', form)

router.route('*', (req, res, next) => {
    res.redirect('/home')
  })

router.use((req)=>{
    let url = req.url.slice(1);
    $(`#main-menu li a[data-url=${url}]`).addClass('active-menu').parents('li').siblings().children('a').removeClass('active-menu')
})
export default router;