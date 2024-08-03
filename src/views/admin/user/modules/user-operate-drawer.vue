<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { createAppUser, fetchGetAllRoles, updateAppUser } from '@/service/api';
import { $t } from '@/locales';
import { lockedStatusOptions } from '@/constants/options';

defineOptions({
  name: 'UserOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Dto.SystemManage.AppUserDTO | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.admin.user.addUser'),
    edit: $t('page.admin.user.editUser')
  };
  return titles[props.operateType];
});

type Model = Dto.SystemManage.AppUserModifyDTO;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    username: '',
    account: '',
    phone: '',
    email: '',
    roles: [],
    locked: false
  };
}

type RuleKey = Extract<keyof Model, 'account' | 'locked'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  account: defaultRequiredRule,
  locked: defaultRequiredRule
};

/** the enabled role options */
const roleOptions = ref<CommonType.Option<number>[]>([]);

async function getRoleOptions() {
  const { error, data } = await fetchGetAllRoles();

  if (!error) {
    const options = data.map(item => ({
      label: item.displayName,
      value: item.id
    }));

    roleOptions.value = [...options];
  }
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
    model.roles = props.rowData.roles?.map(item => item.id) || [];
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  if (props.operateType === 'add') {
    createAppUser(model).then(() => {
      window.$message?.success($t('common.addSuccess'));
    });
  } else {
    updateAppUser(model).then(() => {
      window.$message?.success($t('common.updateSuccess'));
    });
  }
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    getRoleOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.admin.user.account')" path="account">
          <NInput v-model:value="model.account" :placeholder="$t('page.admin.user.form.account')" />
        </NFormItem>
        <NFormItem v-if="operateType == 'add'" :label="$t('page.admin.user.password')" path="password">
          <NInput v-model:value="model.password" :placeholder="$t('page.admin.user.form.password')" />
        </NFormItem>
        <NFormItem :label="$t('page.admin.user.userName')" path="username">
          <NInput v-model:value="model.username" :placeholder="$t('page.admin.user.form.userName')" />
        </NFormItem>
        <NFormItem :label="$t('page.admin.user.userPhone')" path="phone">
          <NInput v-model:value="model.phone" :placeholder="$t('page.admin.user.form.userPhone')" />
        </NFormItem>
        <NFormItem :label="$t('page.admin.user.userEmail')" path="email">
          <NInput v-model:value="model.email" :placeholder="$t('page.admin.user.form.userEmail')" />
        </NFormItem>
        <NFormItem :label="$t('page.admin.user.locked')" path="locked">
          <NRadioGroup v-model:value="model.locked">
            <NRadioButton
              v-for="item in lockedStatusOptions"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.admin.user.userRole')" path="roles">
          <NSelect
            v-model:value="model.roles"
            multiple
            :options="roleOptions"
            :placeholder="$t('page.admin.user.form.userRole')"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
