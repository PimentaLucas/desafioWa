const Laboratorio = require('../models/laboratorio')



exports.criarLaboratorio = async (req, res, next) => {
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
        const { nome, logradouro, complemento, bairro, cep, cidade, estado, numero } = req.body
        const laboratorio = new Laboratorio({
            nome: nome,
            endereco: {
                logradouro: logradouro,
                numero: numero,
                bairro: bairro,
                complemento: complemento,
                cidade: cidade,
                estado: estado,
                cep: cep
            },
            status: true
        })
        const laboratorioSalvo = await laboratorio.save();
        res.status(200).json({ laboratorioSalvo })

    } catch (error) {
        res.status(error.statusCode).json(error.data);

    }
}

exports.listarLaboratorios = async (req, res, next) => {
    try {
        const laboratorios = await Laboratorio.find({ status: true })
        res.status(200).json({ laboratorios })
    } catch (error) {
        res.status(500).json('Erro interno do servidor')
    }
}


exports.removerLaboratorio = async (req, res, next) => {
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
        const { laboratorioId } = req.body
        await Laboratorio.findOneAndUpdate({ _id: laboratorioId }, { $set: { status: false } })
        res.status(200).json('Laboratório deletado com sucesso.')
    } catch (error) {
        res.status(500).json(error.data)
    }
}


exports.atualizarLaboratorio = async (req, res, next) => {
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
        const { nome, logradouro, complemento, bairro, cep, cidade, estado, numero, laboratorioId } = req.body
        const laboratorio = await Laboratorio.findOneAndUpdate({ _id: laboratorioId }, {
            $set: {
                nome: nome, 'endereco.logradouro': logradouro, 'endereco.complemento': complemento,
                'endereco.bairro': bairro, 'endereco.cep': cep, 'endereco.cidade': cidade, 'endereco.estado': estado, 'endereco.numero': numero
            }
        })
        res.status(200).json({ laboratorio })

    } catch (error) {
        res.status(error.statusCode).json(error.data);

    }
}