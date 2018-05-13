create database MoneyCellsService
go

use MoneyCellsService
go

create table [dbo].[MoneyCells]
(
[Id] bigint PRIMARY KEY Identity(1,1),
[OwnerId] bigint not null,
[CreationDate] datetime not null,
[Type] tinyint not null,
[CurrencyType] tinyint not null,
[Balance] float not null,
[Status] tinyint not null,
[Name] nvarchar(200) default ''
)

go

create table [dbo].[Transactions]
(
[Id] bigint PRIMARY KEY Identity(1,1),
[From] bigint not null,
[To] bigint not null,
[Amount] float not null,
[Date] datetime not null,
[Status] tinyint not null

CONSTRAINT FK_From_MoneyCells_Id FOREIGN KEY ([From])     
    REFERENCES [dbo].[MoneyCells] ([Id])
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,

CONSTRAINT FK_To_MoneyCells_Id FOREIGN KEY ([To])     
    REFERENCES [dbo].[MoneyCells] ([Id])
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
)

go

alter table [dbo].[MoneyCells]
add [IsDeleted] bit not null default 0 

go

create table [dbo].[SystemMoneyCellIds]
(
[Currency] int PRIMARY KEY,
[MoneyCellId] bigint not null
)



