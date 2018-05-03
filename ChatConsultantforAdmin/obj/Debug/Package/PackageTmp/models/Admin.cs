using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChatConsultantforAdmin.models
{
    public class Admin
    {
        public int Id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string post { get; set; }
        public string email { get; set; }
        public string site { get; set; }
        public bool status { get; set; }
    }
}