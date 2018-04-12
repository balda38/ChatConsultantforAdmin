using ChatConsultantforAdmin.models;
using Ninject.Modules;

namespace ChatConsultantforAdmin.Util
{
    public class NinjectRegistrations : NinjectModule
    {
        public override void Load()
        {
            Bind<AdmRepository>().To<AdminsRepository>();
            Bind<MsgRepository>().To<MessagesRepository>();
            Bind<ClntRepository>().To<ClientsRepository>();
        }
    }
}