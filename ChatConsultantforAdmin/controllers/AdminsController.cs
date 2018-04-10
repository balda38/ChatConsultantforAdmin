using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ChatConsultantforAdmin.models;
using Ninject;

namespace ChatConsultantforAdmin.controllers
{
    public class AdminsController : Controller
    {
        private AdminContext db = new AdminContext();
        IRepository repository;

        public AdminsController()
        {
            IKernel ninjectKernel = new StandardKernel();
            ninjectKernel.Bind<IRepository>().To<AdminsRepository>();
            repository = ninjectKernel.Get<IRepository>();
        }

        // GET: Admins
        public ActionResult Index()
        {
            return View(repository.List());
        }

        [HttpPost]
        public JsonResult NewAdmin(string login, string password)
        {
            Admin admin = new Admin();
            admin.login = login;
            admin.password = password;

            JsonResult jsonMsg = Json("");

            if (repository.Check(login)) jsonMsg = Json("Учетная запись администратора с таким именем уже существует");
            else
            {
                repository.Save(admin);
                jsonMsg = Json("Успешная регистрация");
            }            

            return jsonMsg;
        }

        [HttpGet]
        public JsonResult AdminEnter(string login, string password)
        {
            JsonResult jsonMsg = Json("");

            if (repository.Enter(login, password)) jsonMsg = Json("Успешный вход", JsonRequestBehavior.AllowGet);
            else jsonMsg = Json("Неправильный логин или пароль", JsonRequestBehavior.AllowGet);

            return jsonMsg;
        }
    }
}
