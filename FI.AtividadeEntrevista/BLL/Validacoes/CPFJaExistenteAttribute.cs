using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace FI.AtividadeEntrevista.BLL.Validacoes
{
    public class CPFJaExistenteAttribute : ValidationAttribute
    {
        DAL.DaoCliente cli;

        public CPFJaExistenteAttribute()
        {
            cli = new DAL.DaoCliente();
        }

        public override bool IsValid(object value)
        {
            string cpf = value as string;
            return !cli.VerificarExistencia(cpf);
        }
    }
}
