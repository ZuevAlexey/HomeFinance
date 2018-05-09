using AutoMapper;
using MyCompany.Services.MoneyCells.Contracts.Data;
using MyCompany.Services.MoneyCells.Contracts.Enums;
using MyCompany.Services.MoneyCells.Service.Data.Entities;

namespace MyCompany.Services.MoneyCells.Service.Mapping {
   /// <summary>
   /// Маппер сущностей сервиса денежных ячеек
   /// </summary>
   public class MoneyCellsMapper : IMoneyCellsMapper {
      public MoneyCellsMapper() {
         Initialyze();
      }

      /// <summary>
      /// Сконвертировать объект типа <see cref="MoneyCellEntity" /> в объект типа <see cref="MoneyCell" />
      /// </summary>
      /// <param name="moneyCellEntity">Сущность бд, представляющая денежную ячейку</param>
      /// <returns>Денежная ячейка</returns>
      public MoneyCell MapToMoneyCell(MoneyCellEntity moneyCellEntity) {
         return Mapper.Map<MoneyCell>(moneyCellEntity);
      }

      /// <summary>
      /// Сконвертировать объект типа <see cref="MoneyCell" /> в объект типа <see cref="MoneyCellEntity" />
      /// </summary>
      /// <param name="moneyCell">Денежная ячейка</param>
      /// <returns>Сущность бд, представляющая денежную ячейку</returns>
      public MoneyCellEntity MapToMoneyCellEntity(MoneyCell moneyCell) {
         return Mapper.Map<MoneyCellEntity>(moneyCell);
      }

      /// <summary>
      /// Сконвертировать объект типа <see cref="TransactionEntity" /> в объект типа <see cref="Transaction" />
      /// </summary>
      /// <param name="transactionEntity">Сущность бд, представляющая валютную транзакцию</param>
      /// <returns>Валютная транзакция</returns>
      public Transaction MapToTransaction(TransactionEntity transactionEntity) {
         return Mapper.Map<Transaction>(transactionEntity);
      }

      /// <summary>
      /// Сконвертировать объект типа <see cref="Transaction" /> в объект типа <see cref="TransactionEntity" />
      /// </summary>
      /// <param name="transaction">Валютная транзакция</param>
      /// <returns>Сущность бд, представляющая валютную транзакцию</returns>
      public TransactionEntity MapToTransactionEntity(Transaction transaction) {
         return Mapper.Map<TransactionEntity>(transaction);
      }

      private void Initialyze() {
         Mapper.Initialize(e => {
            e.CreateMap<MoneyCell, MoneyCellEntity>()
               .ForMember(t => t.CurrencyType, s => s.MapFrom(o => (byte) o.CurrencyType))
               .ForMember(t => t.Status, s => s.MapFrom(o => (byte) o.Status))
               .ForMember(t => t.Type, s => s.MapFrom(o => (byte) o.Type));
            e.CreateMap<MoneyCellEntity, MoneyCell>()
               .ForMember(t => t.CurrencyType, s => s.MapFrom(o => (CurrencyType) o.CurrencyType))
               .ForMember(t => t.Status, s => s.MapFrom(o => (MoneyCellStatus) o.Status))
               .ForMember(t => t.Type, s => s.MapFrom(o => (MoneyCellType) o.Type));
            e.CreateMap<Transaction, TransactionEntity>()
               .ForMember(t => t.Status, s => s.MapFrom(o => (byte) o.Status));
            e.CreateMap<TransactionEntity, Transaction>()
               .ForMember(t => t.Status, s => s.MapFrom(o => (TransactionStatus) o.Status));
         });

         Mapper.AssertConfigurationIsValid();
      }
   }
}