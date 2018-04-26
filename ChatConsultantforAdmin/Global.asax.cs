using Ninject;
using Ninject.Modules;
using Ninject.Web.Mvc;
using ChatConsultantforAdmin.models;
using ChatConsultantforAdmin.Util;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ChatConsultantforAdmin
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            NinjectModule registrations = new NinjectRegistrations();
            var kernel = new StandardKernel(registrations);
            DependencyResolver.SetResolver(new NinjectDependencyResolver(kernel));
        }

        protected void Application_EndRequest()
        {   
            var errors = this.Context.AllErrors;
        }
    }
}
