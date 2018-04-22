using Moq;
using MyCompany.Services.Entity.MoneyCells.Contracts;
using MyCompany.Services.Entity.MoneyCells.Contracts.Data;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using MyCompany.Services.Entity.People.Contracts;
using MyCompany.Services.Entity.People.Contracts.Data;
using MyCompany.Services.Managers.People;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests {
   [TestFixture]
   public class PeopleManagerTests {
      List<Person> _persons;

      [SetUp]
      public void Init() {
         _persons = new List<Person> {
            new Person(){
               PersonId=1,
               Data=new PersonData(){
                  BirthDate=new DateTime(1995,4,13),
                  FirstName="Иван",
                  LastName="Андреев",
                  MiddleName="Сергеевич"
                  }
               },
            new Person(){
               PersonId=2,
               Data=new PersonData(){
                  BirthDate=new DateTime(1995,4,13),
                  FirstName="Сергей",
                  LastName="Федоров",
                  MiddleName="Иванович"
                  }
               },
            new Person(){
               PersonId=3,
               Data=new PersonData(){
                  BirthDate=new DateTime(1995,4,13),
                  FirstName="Марина",
                  LastName="Зуброва",
                  MiddleName="Валентиновна"
                  }
               },
            };
      }

      [TearDown]
      public void Clear() {
         _persons=null;
      }


      [Test]
      public void CtorSaveTest() {
         //Arrange
         var peopleMock = new Mock<IPeopleService>();
         var moneyMock = new Mock<IMoneyCellsService>();
         //Act
         PeopleManagerService service = new PeopleManagerService(peopleMock.Object, moneyMock.Object);
         //Assert
         Assert.AreEqual(peopleMock.Object, service.PeopleService);
         Assert.AreEqual(moneyMock.Object, service.MoneyCellsService);
      }

      [Test]
      public void CtorNullReferenceExceptionTest() {
         //Arrange
         var peopleMock = new Mock<IPeopleService>();
         //Act 
         //Assert
         Assert.Throws<NullReferenceException>(() => new PeopleManagerService(peopleMock.Object, null));
      }

      [Test]
      public void GetAllCountTest() {
         //Arrange
         var peopleMock = new Mock<IPeopleService>();
         peopleMock.Setup(p => p.GetAll()).Returns(_persons);
         var moneyMock = new Mock<IMoneyCellsService>();
         PeopleManagerService service = new PeopleManagerService(peopleMock.Object, moneyMock.Object);
         //Act
         IList<Person> persons = service.GetAllPeople();
         //Assert
         Assert.AreEqual(persons.Count, _persons.Count);
      }

      [Test]
      public void GetPeopleCountTest() {
         //Arrange
         var peopleMock = new Mock<IPeopleService>();
         peopleMock.Setup(p => p.GetRange(It.IsAny<IEnumerable<long>>()))
            .Returns<IEnumerable<long>>(ids => _persons.Where(p => ids.Contains(p.PersonId)).ToList());
         var moneyMock = new Mock<IMoneyCellsService>();
         PeopleManagerService service = new PeopleManagerService(peopleMock.Object, moneyMock.Object);
         //Act
         IList<Person> persons = service.GetPeople(new long[] { 2, 3 });
         //Assert
         Assert.AreEqual(persons.Count, 2);
      }

      [Test]
      public void GetPeopleTest() {
         //Arrange
         var peopleMock = new Mock<IPeopleService>();
         peopleMock.Setup(p => p.GetOne(It.IsAny<long>()))
            .Returns<long>(id => _persons.FirstOrDefault(p => p.PersonId == id));
         var moneyMock = new Mock<IMoneyCellsService>();
         PeopleManagerService service = new PeopleManagerService(peopleMock.Object, moneyMock.Object);
         //Act
         Person person = service.GetPerson(2);
         //Assert
         Assert.AreEqual(person.Data.FirstName, "Сергей");
      }

      [Test]
      public void CreateMoneyCellCheckOwnerExistTest() {
         //Arrange
         var peopleMock = new Mock<IPeopleService>();
         var moneyMock = new Mock<IMoneyCellsService>();
         moneyMock.Setup(ms=>ms.AddRange(It.IsAny<IEnumerable<MoneyCellData>>()))
            .Returns<IEnumerable<MoneyCellData>>(msData=>new List<MoneyCell>());
         PeopleManagerService service = new PeopleManagerService(peopleMock.Object, moneyMock.Object);
         MoneyCellData data = new MoneyCellData() {
            Currency=Currency.RUB,
            Name="Заначка на отдых",
            OwnerId=3,
            Status=MoneyCellStatus.Active,
            Type=MoneyCellType.Сash
         };
         //Act
         IList<MoneyCell> cells = service.CreateMoneyCell(new List<MoneyCellData>{data});
         //Assert
         peopleMock.Verify(ps=>ps.GetOne(It.Is<long>(id=>id==data.OwnerId)));
      }
   }
}
