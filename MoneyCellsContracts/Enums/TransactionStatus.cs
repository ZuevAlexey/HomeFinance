namespace MyCompany.Services.Entity.MoneyCells.Contracts.Enums {
   /// <summary>
   /// Статус транзакции
   /// </summary>
   public enum TransactionStatus {
      /// <summary>
      /// Обрабатывается
      /// </summary>
      Processing = 0,

      /// <summary>
      /// Успех
      /// </summary>
      Success = 1,

      /// <summary>
      /// Неудача
      /// </summary>
      Fail = 2
   }
}