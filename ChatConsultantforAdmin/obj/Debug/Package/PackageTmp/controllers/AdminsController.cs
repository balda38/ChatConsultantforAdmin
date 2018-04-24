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
        AdmRepository repository;

        public AdminsController(AdmRepository repo)
        {
            repository = repo;
        }

        // GET: Admins
        public ActionResult Index()
        {
            return View(repository.List());
        }

        public ActionResult Edit()
        {
            return View();
        }

        public ActionResult EditAdmin(string password)
        {
            repository.Edit(password);
            return RedirectToAction("Edit");
        }

        [HttpPost]
        public JsonResult NewAdmin(string login, string password)
        {
            JsonResult jsonMsg = Json("");

            if (repository.Check(login)) jsonMsg = Json("Учетная запись администратора с таким именем уже существует");
            else
            {
                repository.Save(login, password);
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
