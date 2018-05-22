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

        public JsonResult EditAdmin(Admin settings)
        {
            JsonResult jsonMsg = Json("done");

            repository.Edit(settings);
            return jsonMsg;
        }

        [HttpPost]
        public JsonResult NewAdmin(Admin admin)
        {
            JsonResult jsonMsg = Json("");

            if (repository.Check(admin.login)) jsonMsg = Json("Учетная запись администратора с таким именем уже существует");
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
            return Json(repository.Enter(login, password), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SettingsList(string login)
        {
            return Json(repository.List().Where(x => x.login == login), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ChangeStatus(string login, bool status)
        {
            if (repository.ChangeStatus(login, status)) return Json(repository.List().Where(x => x.login == login).FirstOrDefault().name);
            else return Json("Данная учетная запись уже авторизована");            
        }

        [HttpGet]
        public JsonResult GetAdmin(string site)
        {
            return Json(repository.GetAdmin(site), JsonRequestBehavior.AllowGet);
        }
    }
}
