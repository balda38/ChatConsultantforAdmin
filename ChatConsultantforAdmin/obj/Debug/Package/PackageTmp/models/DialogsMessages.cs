using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChatConsultantforAdmin.models
{
    public class DialogsMessages
    {
        public int id { get; set; }
        public string msgText { get; set; }
        public string msgFrom { get; set; }
        public string msgTo { get; set; }
        public DateTime date { get; set; }
    }
}