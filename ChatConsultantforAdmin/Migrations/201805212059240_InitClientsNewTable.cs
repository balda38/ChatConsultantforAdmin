namespace ChatConsultantforAdmin.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitClientsNewTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Clients",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        name = c.String(),
                        site = c.String(),
                        admin = c.String(),
                        last_message = c.DateTime(nullable: false),
                        status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.id);
        }
        
        public override void Down()
        {

        }
    }
}
