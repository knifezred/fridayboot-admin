import { request } from '../../request';
export function fetchAppUserPagedList(params?: Dto.SystemManage.UserSearchParams) {
  return request<Dto.SystemManage.UserList>({
    url: '/user/list',
    method: 'post',
    data: params
  });
}
export function createAppUser(params: Dto.SystemManage.AppUserModifyDTO) {
  return request<boolean>({
    url: '/user',
    method: 'post',
    data: params
  });
}

export function updateAppUser(params: Dto.SystemManage.AppUserModifyDTO) {
  return request<boolean>({
    url: `/user/${params.id}`,
    method: 'post',
    data: params
  });
}
export function deleteAppUser(id: number) {
  return request<boolean>({
    url: `/user/${id}`,
    method: 'delete'
  });
}
export function batchDeleteAppUser(ids: number[]) {
  return request<boolean>({
    url: `/user/batch-delete`,
    method: 'delete',
    data: { ids }
  });
}
