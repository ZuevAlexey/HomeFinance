using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MyCompany.Services.Groups.Contracts.Data;
using MyCompany.Services.Groups.Service.Data.Entities;
using Ninject.Activation.Strategies;

namespace MyCompany.Services.Groups.Service.Mapping {
   /// <inheritdoc />
   /// <summary>
   /// Маппер сущностей сервиса группировок
   /// </summary>
   internal class GroupMapper : IGroupMapper {
      public GroupMapper() {
         Initialize();
      }

      /// <inheritdoc />
      public Group MapToGroup(GroupEntity groupEntity) {
         return Mapper.Map<Group>(groupEntity);
      }

      /// <inheritdoc />
      public GroupEntity MapToGroupEntity(Group group) {
         return Mapper.Map<GroupEntity>(group);
      }

      private void Initialize() {
         Mapper.Initialize(e => {
            e.CreateMap<Group, GroupEntity>()
               .ForMember(g => g.Children, s => s.MapFrom(o => o.Children.Select(c=>new ChildEntity{Id = c, GroupId = o.Id})));
            e.CreateMap<GroupEntity, Group>()
               .ForMember(g => g.Children, s => s.MapFrom(o => new HashSet<long>(o.Children.Select(c => c.Id))));
         });

         Mapper.AssertConfigurationIsValid();
      }
   }
}
