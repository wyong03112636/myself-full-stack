import positionView from '../views/position.art'

export const position = (req, res, next)=>{
    res.render(positionView())
}