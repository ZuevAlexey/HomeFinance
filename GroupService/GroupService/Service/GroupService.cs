using System;
using System.Collections.Generic;
using System.Linq;
using JRPC.Service;
using MyCompany.Services.Groups.Contracts;
using MyCompany.Services.Groups.Contracts.Data;
using MyCompany.Services.Groups.Service.Data.Provider;
using MyCompany.Services.Groups.Service.Mapping;

namespace MyCompany.Services.Groups.Service.Service {
   /// <inheritdoc cref="IGroupService" />
   /// <summary>
   /// Сервис группировок
   /// </summary>
   internal class GroupService : JRpcModule, IGroupService {
      private readonly IGroupProvider _provider;
      private readonly IGroupMapper _mapper;

      public GroupService(IGroupProvider provider, IGroupMapper mapper) {
         _provider = provider;
         _mapper = mapper;
      }

      /// <inheritdoc />
      public ICollection<long> UpsertGroups(IEnumerable<Group> groups) {
         try {
            return _provider.UpsertGroups(groups.Select(g => _mapper.MapToGroupEntity(g)));
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }

      /// <inheritdoc />
      public ICollection<Group> GetGroups(IEnumerable<long> ids) {
         try {
            return _provider.GetGroups(ids).Select(g => _mapper.MapToGroup(g)).ToList();
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }

      /// <inheritdoc />
      public ICollection<bool> AddInGroup(long groupId, IEnumerable<long> childrenIds) {
         try {
            return _provider.AddInGroup(groupId, childrenIds);
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }

      /// <inheritdoc />
      public ICollection<bool> RemoveFromGroup(long groupId, IEnumerable<long> childrenIds) {
         try {
            return _provider.RemoveFromGroup(groupId, childrenIds);
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }

      /// <inheritdoc />
      public ICollection<long> GetGroupList(long groupId) {
         try {
            return _provider.GetGroupList(groupId);
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }
   }
}