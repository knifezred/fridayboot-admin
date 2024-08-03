<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { batchDeleteAppUser, deleteAppUser, fetchAppUserPagedList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
// import { enableStatusRecord } from '@/constants/business';
import { useTable, useTableOperate } from '@/hooks/common/table';
import UserOperateDrawer from './modules/user-operate-drawer.vue';
import UserSearch from './modules/user-search.vue';

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchAppUserPagedList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    locked: null,
    username: '',
    organizationIds: []
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'id',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'username',
      title: $t('page.admin.user.userName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'phone',
      title: $t('page.admin.user.userPhone'),
      align: 'center',
      width: 120
    },
    {
      key: 'email',
      title: $t('page.admin.user.userEmail'),
      align: 'center',
      minWidth: 200
    },
    // {
    //   key: 'locked',
    //   title: $t('page.admin.user.userStatus'),
    //   align: 'center',
    //   width: 100,
    //   render: row => {
    //     if (row.locked === null) {
    //       return null;
    //     }

    //     const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
    //       '0': 'success',
    //       '1': 'warning'
    //     };

    //     const label = $t(enableStatusRecord[row.locked ? 1 : 0]);

    //     return <NTag type={tagMap[row.locked ? 1 : 0]}>{label}</NTag>;
    //   }
    // },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  batchDeleteAppUser(checkedRowKeys.value as unknown as number[]).then(() => {
    onBatchDeleted();
  });
}

function handleDelete(id: number) {
  deleteAppUser(id).then(() => {
    onDeleted();
  });
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard :title="$t('page.admin.user.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
