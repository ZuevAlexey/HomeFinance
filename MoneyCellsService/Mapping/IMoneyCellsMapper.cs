using MyCompany.Services.MoneyCells.Contracts.Data;
using MyCompany.Services.MoneyCells.Service.Data.Entities;

namespace MyCompany.Services.MoneyCells.Service.Mapping {
   /// <summary>
   /// Интерфейс маппер сущностей сервиса денежных ячеек
   /// </summary>
   public interface IMoneyCellsMapper {
      /// <summary>
      /// Сконвертировать объект типа <see cref="MoneyCellEntity" /> в объект типа <see cref="MoneyCell" />
      /// </summary>
      /// <param name="moneyCellEntity">Сущность бд, представляющая денежную ячейку</param>
      /// <returns>Денежная ячейка</returns>
      MoneyCell MapToMoneyCell(MoneyCellEntity moneyCellEntity);

      /// <summary>
      /// Сконвертировать объект типа <see cref="MoneyCell" /> в объект типа <see cref="MoneyCellEntity" />
      /// </summary>
      /// <param name="moneyCellEntity">Денежная ячейка</param>
      /// <returns>Сущность бд, представляющая денежную ячейку</returns>
      MoneyCellEntity MapToMoneyCellEntity(MoneyCell moneyCell);

      /// <summary>
      /// Сконвертировать объект типа <see cref="TransactionEntity" /> в объект типа <see cref="Transaction" />
      /// </summary>
      /// <param name="transactionEntity">Сущность бд, представляющая валютную транзакцию</param>
      /// <returns>Валютная транзакция</returns>
      Transaction MapToTransaction(TransactionEntity transactionEntity);

      /// <summary>
      /// Сконвертировать объект типа <see cref="Transaction" /> в объект типа <see cref="TransactionEntity" />
      /// </summary>
      /// <param name="transactionEntity">Валютная транзакция</param>
      /// <returns>Сущность бд, представляющая валютную транзакцию</returns>
      TransactionEntity MapToTransactionEntity(Transaction transaction);
   }
}