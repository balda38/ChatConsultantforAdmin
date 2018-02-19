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
    public class MessagesController : Controller
    {
        private DialogsMessageContext db = new DialogsMessageContext();
        // GET: Messages
        public ActionResult DialogWindow()
        {
            return View(db.DialogsMessages.ToList());
        }

        [HttpPost]
        public JsonResult AddMessage(string messageText, string messageFrom, string messageTo)
        {
            //DialogsMessages msg = new DialogsMessages();
            //msg.msgText = messageText;
            //msg.msgFrom = messageFrom;
            //msg.msgTo = messageTo;
            //string dateFormat = "dd.MM.yyyy HH:mm:ss";
            //msg.date = DateTime.Parse(DateTime.Now.ToString(dateFormat));

            //db.DialogsMessages.Add(msg);
            //db.SaveChanges();
            return Json(new { status = "Ok" });
        }

        [HttpGet]
        public JsonResult SetClient(string client)
        {
            var clientMessages = db.DialogsMessages.Where(x => x.msgTo == client).ToList();

            return Json(clientMessages, JsonRequestBehavior.AllowGet);
        }
    }
}