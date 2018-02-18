using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ChatConsultantforAdmin.models;

namespace ChatConsultantforAdmin.controllers
{
    public class ClientsController : Controller
    {
        private ClientsContext db1 = new ClientsContext();
        private DialogsMessageContext db2 = new DialogsMessageContext();
        private CombiModel cm = new CombiModel();
        private string user = null;
        // GET: Message
        public ActionResult Index()
        {
            cm.client = db1.Clients.ToList();
            if(user == null) cm.dialogMessage = db2.DialogsMessages.ToList();
            else cm.dialogMessage = db2.DialogsMessages.Where(x => x.msgTo == user).ToList();
            return View(cm);
        }

        [HttpPost]
        public ActionResult SelectClient(string client)
        {
            user = client;

            Index();

            return Json(new { status = "Ok" });
        }
    }
}