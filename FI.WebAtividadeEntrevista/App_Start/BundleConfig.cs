using System.Web;
using System.Web.Optimization;

namespace WebAtividadeEntrevista
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //Terceiros
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include("~/Scripts/jquery-ui-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include("~/Scripts/bootstrap.js", "~/Scripts/respond.js"));
            bundles.Add(new ScriptBundle("~/bundles/jtable").Include("~/Scripts/jtable/jquery.jtable.min.js", "~/Scripts/jtable/localization/jquery.jtable.pt-BR.js"));
            bundles.Add(new ScriptBundle("~/bundles/maskedInput").Include("~/Scripts/jquery.maskedinput.min.js"));
            //Terceiros - Estilos
            bundles.Add(new StyleBundle("~/Content/jtable").Include("~/Scripts/jtable/themes/metro/darkgray/jtable.css"));

            //Proprietarios
            bundles.Add(new ScriptBundle("~/bundles/clientes").Include("~/Scripts/Clientes/FI.Clientes.js"));
            bundles.Add(new ScriptBundle("~/bundles/listClientes").Include("~/Scripts/Clientes/FI.ListClientes.js"));
            bundles.Add(new ScriptBundle("~/bundles/altClientes").Include("~/Scripts/Clientes/FI.AltClientes.js"));
            //Proprietarios - Estilos
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/bootstrap.css", "~/Content/site.css"));
        }
    }
}
