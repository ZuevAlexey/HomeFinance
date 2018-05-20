﻿using System;

namespace MyCompany.Services.People.Contracts.Data {
   /// <summary>
   /// Человек
   /// </summary>
   public class Person {
      /// <summary>
      /// Идентификатор
      /// </summary>
      public long Id { get; set; }

      /// <summary>
      /// Фамилия
      /// </summary>
      public string FirstName { get; set; }

      /// <summary>
      /// Имя
      /// </summary>
      public string LastName { get; set; }

      /// <summary>
      /// Отчетство
      /// </summary>
      public string MiddleName { get; set; }

      /// <summary>
      /// Дата рождения
      /// </summary>
      public DateTime BirthDate { get; set; }
   }
}