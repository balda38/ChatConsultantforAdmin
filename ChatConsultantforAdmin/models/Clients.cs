using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChatConsultantforAdmin.models
{
    public class Clients
    {
        public int id { get; set; }
        public string name { get; set; }
        public string admin { get; set; }
        public string last_message { get; set; }
    }
}