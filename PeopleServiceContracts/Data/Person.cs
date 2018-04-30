﻿using System;

namespace MyCompany.Services.Entity.People.Contracts.Data {
   public class Person {
      public long PersonId { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string MiddleName { get; set; }
      public DateTime BirthDate { get; set; }
   }
}