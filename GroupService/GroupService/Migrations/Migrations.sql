create database GroupService
go

use GroupService
go

create table [dbo].[Groups]
(
[Id] bigint PRIMARY KEY Identity(1,1),
[Name] nvarchar(200) not null
)

go

create table [dbo].[Children]
(
[Id] bigint not null,
[GroupId] bigint not null

CONSTRAINT FK_From_MoneyCells_Id FOREIGN KEY ([GroupId])     
    REFERENCES [dbo].[Groups] ([Id])
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,

CONSTRAINT PK_Id_GroupId PRIMARY KEY ([Id],[GroupId])	
)

go

