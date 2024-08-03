import { request } from '../../request';
/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Dto.SystemManage.AllRole[]>({
    url: '/role/all',
    method: 'post'
  });
}

/** get role list */
export function fetchGetRoleList(params?: Dto.SystemManage.RoleSearchParams) {
  return request<Dto.SystemManage.RoleList>({
    url: '/role/list',
    method: 'post',
    data: params
  });
}

export function createAppRole(params: Dto.SystemManage.AppRole) {
  return request<boolean>({
    url: '/role',
    method: 'post',
    data: params
  });
}

export function updateAppRole(params: Dto.SystemManage.AppRole) {
  return request<boolean>({
    url: `/role/${params.id}`,
    method: 'post',
    data: params
  });
}
export function deleteAppRole(id: number) {
  return request<boolean>({
    url: `/role/${id}`,
    method: 'delete'
  });
}
export function batchDeleteAppRole(ids: number[]) {
  return request<boolean>({
    url: `/role/batch-delete`,
    method: 'delete',
    data: { ids }
  });
}
