using System.Collections.Generic;
using MyCompany.Services.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.MoneyCells.Contracts.Seacrh {
   /// <summary>
   /// ������ �������� �����
   /// </summary>
   public class MoneyCellFilter {
      /// <summary>
      /// �������������� �����
      /// </summary>
      public HashSet<long> Ids { get; set; }

      /// <summary>
      /// �������������� ����������
      /// </summary>
      public HashSet<long> OwnersIds { get; set; }

      /// <summary>
      /// ������� �����
      /// </summary>
      public HashSet<MoneyCellStatus> Statuses { get; set; }

      /// <summary>
      /// ������� ������� �� ������. �� ��������� �� ������������� ��������� ������
      /// </summary>
      public bool IsDeleted { get; set; } = false;
   }}