create database PeopleService
go

use PeopleService
go

create table [dbo].[People]
(
[Id] bigint PRIMARY KEY Identity(1,1),
[FirstName] nvarchar(200) not null,
[LastName] nvarchar(200) not null,
[MiddleName] nvarchar(200),
[BirthDate] datetime not null
)