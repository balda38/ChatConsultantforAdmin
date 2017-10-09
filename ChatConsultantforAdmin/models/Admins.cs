using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChatConsultantforAdmin.models
{
    public class Admins
    {
        public int Id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
    }
}