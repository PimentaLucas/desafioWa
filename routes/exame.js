const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const exameController = require('../controllers/exame');


router.post('/cadastro', [
    body('nome').trim().not().isEmpty().withMessage('Preencha o campo de nome'),
    body('tipo').trim().not().isEmpty().withMessage('Preencha o campo de tipo')], exameController.criarExame);

router.delete('/deletar', [
    body('exameId').trim().not().isEmpty().withMessage('Preencha o campo laboratorioId')], exameController.removerExame);


router.post('/atualizar', [
    body('nome').trim().not().isEmpty().withMessage('Preencha o campo de nome'),
    body('tipo').trim().not().isEmpty().withMessage('Preencha o campo de tipo')
], exameController.atualizarExame);

router.get('/', [
], exameController.listarExames);

router.post('/associar', [
    body('exameId').trim().not().isEmpty().withMessage('Preencha o campo de id do exame'),
    body('laboratorioId').trim().not().isEmpty().withMessage('Preencha o campo de id do laboratorio')
], exameController.associarExame);

router.post('/desassociar', [
    body('exameId').trim().not().isEmpty().withMessage('Preencha o campo de id do exame'),
    body('laboratorioId').trim().not().isEmpty().withMessage('Preencha o campo de id do laboratorio')
], exameController.dessociarExame);


module.exports = router;