namespace ChatConsultantforAdmin.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitializeMigration : DbMigration
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
                        last_message = c.DateTime(),
                        status = c.Boolean()
                    })
                .PrimaryKey(t => t.id);
        }
        
        public override void Down()
        {
        }
    }
}
