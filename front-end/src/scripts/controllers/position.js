import positionView from '../views/position.art'
import http from '../models/request'

export const list = async (req, res, next) => {
    let result = await http.get({
        url: '/api/position/findAll'
    })

    if (result.msg) {

        res.render(positionView())
    } else {

        res.go('/home')
    }
}