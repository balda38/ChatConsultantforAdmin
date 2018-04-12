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
        MsgRepository repository1;
        ClntRepository repository2;

        public MessagesController(MsgRepository repo1, ClntRepository repo2)
        {
            repository1 = repo1;
            repository2 = repo2;
        }
        // GET: Messages
        public ActionResult DialogWindow()
        {
            return View(repository1.List());
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

            //repository1.Save(msg);
            //repository2.SetLastMsg(messageTo, msg.date);

            return Json(msg.date);
        }

        [HttpGet]
        public JsonResult SetClient(string client)
        {
            var clientMessages = repository1.SetClient(client);

            return Json(clientMessages, JsonRequestBehavior.AllowGet);
        }
    }
}