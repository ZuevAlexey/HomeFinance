using System.Collections.Generic;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Search {
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