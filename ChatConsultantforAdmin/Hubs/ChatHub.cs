using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using ChatConsultantforAdmin.models;

namespace ChatConsultantforAdmin.Hubs
{
    public class ChatHub : Hub
    {
        static List<Users> Users = new List<Users>();

        public void SendMsg(string name, string message)
        {
            Clients.Client(Context.ConnectionId).addMessage(name, message);
        }

        public void UserConnect(string userName)
        {
            var id = int.Parse(Context.ConnectionId);

            if (!Users.Any(x => x.Id == id))
            {
                Users.Add(new models.Users { Id = id, Name = userName });
            }
        }
    }
}