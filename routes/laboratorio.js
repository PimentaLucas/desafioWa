const express = require('express');
const { body } = require('express-validator');

const laboratorioController = require('../controllers/laboratorio');


router.post('/cadastro', [
    body('nome').trim().not().isEmpty().withMessage('Preencha o campo de nome'),
    body('logradouro').trim().not().isEmpty().withMessage('Preencha o campo de logradouri'),
    body('numero').trim().not().isEmpty().withMessage('Preencha o campo de numero'),
    body('bairro').trim().not().isEmpty().withMessage('Preencha o campo de bairro'),
    body('cidade').trim().not().isEmpty().withMessage('Preencha o campo de cidade'),
    body('estado').trim().not().isEmpty().withMessage('Preencha o campo de estado'),
    body('cep').trim().not().isEmpty().withMessage('Preencha o campo de cep')], laboratorioController.criarLaboratorio);

router.delete('/deletar', [
    body('laboratorioId').trim().not().isEmpty().withMessage('Preencha o campo laboratorioId')], laboratorioController.removerLaboratorio);


router.post('/atualizar', [
    body('nome').trim().not().isEmpty().withMessage('Preencha o campo de nome'),
    body('logradouro').trim().not().isEmpty().withMessage('Preencha o campo de logradouri'),
    body('numero').trim().not().isEmpty().withMessage('Preencha o campo de numero'),
    body('bairro').trim().not().isEmpty().withMessage('Preencha o campo de bairro'),
    body('cidade').trim().not().isEmpty().withMessage('Preencha o campo de cidade'),
    body('estado').trim().not().isEmpty().withMessage('Preencha o campo de estado'),
    body('cep').trim().not().isEmpty().withMessage('Preencha o campo de cep'),
    body('laboratorioId').trim().not().isEmpty().withMessage('Preencha o campo laboratorioId'),
], laboratorioController.criarLaboratorio);

router.get('/', [
], laboratorioController.listarLaboratorios);

