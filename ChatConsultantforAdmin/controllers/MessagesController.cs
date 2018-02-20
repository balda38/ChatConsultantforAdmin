using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ChatConsultantforAdmin.models;
using System.Globalization;

namespace ChatConsultantforAdmin.controllers
{
    public class MessagesController : Controller
    {
        private DialogsMessageContext db1 = new DialogsMessageContext();
        private ClientsContext db2 = new ClientsContext();
        // GET: Messages
        public ActionResult DialogWindow()
        {
            return View(db1.DialogsMessages.ToList());
        }

        [HttpPost]
        public JsonResult AddMessage(string messageText, string messageFrom, string messageTo)
        {
            DialogsMessages msg = new DialogsMessages();
            msg.msgText = messageText;
            msg.msgFrom = messageFrom;
            msg.msgTo = messageTo;
            CultureInfo provider = CultureInfo.GetCultureInfo("ru-RU");
            string dateFormat = "HH:mm:ss dd.MM.yyyy";
            var date = DateTime.Now.ToString();
            msg.date = DateTime.Parse(date, provider);

            //db1.DialogsMessages.Add(msg);
            //db1.SaveChanges();

            var nedeedClient = db2.Clients.Where(x => x.name == messageTo).FirstOrDefault();
            nedeedClient.last_message = msg.date.ToString();
            db2.SaveChanges();

            return Json(msg.date);
        }

        [HttpGet]
        public JsonResult SetClient(string client)
        {
            var clientMessages = db1.DialogsMessages.Where(x => x.msgTo == client).ToList();

            return Json(clientMessages, JsonRequestBehavior.AllowGet);
        }
    }
}