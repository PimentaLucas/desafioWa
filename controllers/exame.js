const Exame = require('../models/exame')



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
        const { nome, tipo, exameId} = req.body
        const exame = await Exame.findOneAndUpdate({ _id: exameId }, {
            $set: {
                nome: nome, tipo:tipo
            }
        })
        res.status(200).json({ exame })

    } catch (error) {
        res.status(error.statusCode).json(error.data);

    }
}