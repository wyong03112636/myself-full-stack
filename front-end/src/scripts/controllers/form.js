import formView from '../views/form-page.art'

export const form = function (req, res, next) {
    res.render(formView())
}