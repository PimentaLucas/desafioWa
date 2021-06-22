const Exame = require('../models/exame')
const Laboratorio = require('../models/laboratorio')
const { validationResult } = require('express-validator');


exports.criarExame = async (req, res, next) => {
    try {
        //Validação se os campos foram preenchidos
        const errors = validationResult(req);
        //Avisa qual campo não foi preenchido caso somente um esteja em branco
        if (!errors.isEmpty()) {
            if (errors.array().length < 2) {
                const error = new Error(errors.array()[0].msg);
                error.statusCode = 500;
                error.data = errors.array()[0].msg;
                throw error;
            }
            else {
                const error = new Error('Preencha os campos obrigatórios!!!');
                error.statusCode = 500;
                error.data = errors.array();
                throw error;
            }
        }
        const { nome, tipo } = req.body
        const exame = new Exame({
            nome: nome,
            tipo: tipo,
            status: true
        })
        const exameSalvo = await exame.save();
        res.status(200).json({ exameSalvo })

    } catch (error) {
        res.status(error.statusCode).json(error.data);

    }
}

exports.listarExames = async (req, res, next) => {
    try {
        const exames = await Exame.find({ status: true })
        res.status(200).json({ exames })
    } catch (error) {
        res.status(500).json('Erro interno do servidor')
    }
}


exports.removerExame = async (req, res, next) => {
    try {
        //Validação se os campos foram preenchidos
        const errors = validationResult(req);
        //Avisa qual campo não foi preenchido caso somente um esteja em branco
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 500;
            error.data = errors.array()[0].msg;
            throw error;
        }
        const { exameId } = req.body
        await Exame.findOneAndUpdate({ _id: exameId }, { $set: { status: false } })
        res.status(200).json('Exame deletado com sucesso.')
    } catch (error) {
        res.status(500).json(error.data)
    }
}


exports.atualizarExame = async (req, res, next) => {
    try {
        //Validação se os campos foram preenchidos
        const errors = validationResult(req);
        //Avisa qual campo não foi preenchido caso somente um esteja em branco
        if (!errors.isEmpty()) {
            if (errors.array().length < 2) {
                const error = new Error(errors.array()[0].msg);
                error.statusCode = 500;
                error.data = errors.array()[0].msg;
                throw error;
            }
            else {
                const error = new Error('Preencha os campos obrigatórios!!!');
                error.statusCode = 500;
                error.data = errors.array();
                throw error;
            }
        }
        const { nome, tipo, exameId } = req.body
        const exame = await Exame.findOneAndUpdate({ _id: exameId }, {
            $set: {
                nome: nome, tipo: tipo
            }
        })
        res.status(200).json({ exame })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
            error.data = 'Id sem exame associado'
        }
        res.status(error.statusCode).json(error.data);

    }
}

exports.associarExame = async (req, res, next) => {
    try {
        //Validação se os campos foram preenchidos
        const errors = validationResult(req);
        //Avisa qual campo não foi preenchido caso somente um esteja em branco
        if (!errors.isEmpty()) {
            if (errors.array().length < 2) {
                const error = new Error(errors.array()[0].msg);
                error.statusCode = 500;
                error.data = errors.array()[0].msg;
                throw error;
            }
            else {
                const error = new Error('Preencha os campos obrigatórios!!!');
                error.statusCode = 500;
                error.data = errors.array();
                throw error;
            }
        }
        const { laboratorioId, exameId } = req.body
        const laboratorio = await Laboratorio.findById(laboratorioId).populate('exames')
        const exame = await Exame.findById(exameId)
        if (laboratorio.status == true) {
            const exameLab = await laboratorio.exames.find(x => x._id == exameId)
            if (exameLab) {
                res.status(200).json({ message: 'Exame já associado a esse laboratório' })
            } else {
                if (exame.status == false) {
                    res.status(200).json({ message: 'Exame desativado' })
                } else {
                    laboratorio.exames.push(exameId)
                    await laboratorio.save()
                    res.status(200).json({ laboratorio })
                }

            }
        } else {
            res.status(200).json({ message: 'Laboratório desativado' })

        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
            error.data = 'Id sem exame associado'
        }
        res.status(error.statusCode).json(error.data);

    }
}

exports.dessociarExame = async (req, res, next) => {
    try {
        //Validação se os campos foram preenchidos
        const errors = validationResult(req);
        //Avisa qual campo não foi preenchido caso somente um esteja em branco
        if (!errors.isEmpty()) {
            if (errors.array().length < 2) {
                const error = new Error(errors.array()[0].msg);
                error.statusCode = 500;
                error.data = errors.array()[0].msg;
                throw error;
            }
            else {
                const error = new Error('Preencha os campos obrigatórios!!!');
                error.statusCode = 500;
                error.data = errors.array();
                throw error;
            }
        }
        const { laboratorioId, exameId } = req.body
        const laboratorio = await Laboratorio.findById(laboratorioId).populate('exames')
        const exame = await Exame.findById(exameId)
        if (laboratorio.status == true) {
            const exameLab = await laboratorio.exames.find(x => x._id == exameId)
            if (exameLab) {
                const index = laboratorio.exames.indexOf(exameLab)
                laboratorio.exames.splice(index, 1);
                await laboratorio.save()
                res.status(200).json({ laboratorio })
            } else {
                res.status(200).json({ message: 'Exame não encontrado' })
            }

        } else {
            res.status(200).json({ message: 'Laboratório desativado' })

        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
            error.data = 'Id sem exame associado'
        }
        res.status(error.statusCode).json(error.data);

    }
}