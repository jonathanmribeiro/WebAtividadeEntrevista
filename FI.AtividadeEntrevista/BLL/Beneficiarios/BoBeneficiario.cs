using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL.Beneficiarios
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            return benef.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            benef.Alterar(beneficiario);
        }

        /// <summary>
        /// Consulta o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public List<DML.Beneficiario> Consultar(long id, long idCliente)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            return benef.Consultar(id, idCliente);
        }

        /// <summary>
        /// Excluir o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            benef.Excluir(id);
        }
    }
}
