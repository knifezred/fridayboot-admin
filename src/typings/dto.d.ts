declare namespace Dto {
  namespace Auth {
    /** Token，用户登录成功返回token结果 */
    interface LoginToken {
      /** 访问令牌 */
      accessToken: string;
      /** 令牌过期时间 */
      expires: number;
      /** 刷新令牌 */
      refreshToken: string;
      /** 刷新令牌时效 */
      refreshTokenExpires: number;
      /** 作用域 */
      scope: string;
    }

    /** AppUserInfoDTO */
    interface AppUserInfoDTO {
      /** 账号 */
      account?: string;
      /** 头像 */
      avatar?: string;
      /** 邮箱 */
      email?: string;
      /** 用户首页 */
      homePath?: string;
      /** 是否启锁定 */
      locked?: boolean;
      /** 菜单列表 */
      menu: AppMenuDTO[];
      /** 所属部门id */
      organizationId?: number;
      /** 所属部门 */
      organizationName?: string;
      /** 角色权限 */
      permissions: string[];
      /** 电话 */
      phone?: string;
      /** 姓名 */
      username?: string;
      /** 角色 */
      userRoles: string[];
    }

    /** AppMenuDTO */
    interface AppMenuDTO {
      /** 徽章 */
      badge?: string;
      /** 组件路径 */
      component?: string;
      /** 创建人 */
      createBy?: string;
      /** 创建时间 */
      createTime?: Date;
      /** 是否删除 */
      deleted?: boolean;
      /** 是否启用 */
      enabled?: boolean;
      /** 是否固定 */
      fixed?: boolean;
      /** 是否热点 */
      hot?: boolean;
      /** 图标 */
      icon?: string;
      /** 主键id */
      id?: number;
      /** 是否缓存 */
      keepAlive?: boolean;
      /** 菜单名称 */
      name?: string;
      /** 父级节点 */
      parentId?: number;
      /** 权限标识 */
      permission?: string;
      /** 重定向 */
      redirect?: string;
      /** 备注 */
      remark?: string;
      /** 菜单标识 */
      route?: string;
      /** 路由地址 */
      routePath?: string;
      /** 排序 */
      sort?: number;
      /** 标签颜色 */
      tagColor?: string;
      /** 过场动画 */
      transition?: string;
      /** 菜单类型 */
      type?: number;
      /** 更新人 */
      updateBy?: string;
      /** 更新时间 */
      updateTime?: Date;
      /** 是否显示 */
      visible?: boolean;
      [property: string]: any;
    }
  }

  namespace SystemManage {
    type CommonSearchParams = Pick<Api.Common.PaginatingCommonParams, 'current' | 'size'>;

    /** AppUser，用户 */
    type AppUser = Api.Common.CommonRecord<{
      /** 姓名 */
      username?: string;
      /** 账号 */
      account?: string;
      /** 头像 */
      avatar?: string;
      /** 是否删除 */
      deleted?: boolean;
      /** 邮箱 */
      email?: string;
      /** 主键id */
      id?: number;
      /** 是否启锁定 */
      locked?: boolean;
      /** 所属部门id */
      organizationId?: number;
      /** 密码 */
      password?: string;
      /** 电话 */
      phone?: string;
    }>;
    /** AppUserDTO */
    type AppUserDTO = Api.Common.CommonRecord<{
      /** 账号 */
      account: string;
      /** 头像 */
      avatar: string;
      /** 邮箱 */
      email: string;
      /** 是否启锁定 */
      locked: boolean;
      /** 所属部门id */
      organizationId: number;
      /** 所属部门 */
      organizationName: string;
      /** 电话 */
      phone: string;
      /** 角色 */
      roles: AllRole[];
      /** 已选择的角色 */
      selectedRoles: Array<number>;
      /** 姓名 */
      username: string;
    }>;

    /** AppUserModifyDTO */
    type AppUserModifyDTO = Api.Common.CommonRecord<{
      /** 姓名 */
      username?: string;
      /** 账号 */
      account?: string;
      /** 头像 */
      avatar?: string;
      /** 是否删除 */
      deleted?: boolean;
      /** 邮箱 */
      email?: string;
      /** 是否启锁定 */
      locked: boolean;
      /** 所属部门id */
      organizationId?: number;
      /** 密码 */
      password?: string;
      /** 电话 */
      phone?: string;
      /** 角色 */
      roles?: number[];
    }>;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '1' | '2';

    /** user */
    type User = Api.Common.CommonRecord<{
      username: string;
      userGender: UserGender | null;
      nickName: string;
      phone: string;
      email: string;
      // roles: string[];
      organizationIds: number[];
      locked: boolean;
    }>;

    /** AppUserPagedQueryRequest */
    interface AppUserPagedQueryRequest {
      /** 是否锁定 */
      locked?: boolean;
      /** 部门 */
      organizationIds?: number[];
      /** 用户姓名 */
      username: string;
    }
    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<SystemManage.AppUserPagedQueryRequest, 'username' | 'organizationIds' | 'locked'> & CommonSearchParams
    >;

    /** user list */
    type UserList = Api.Common.PaginatingQueryRecord<AppUserDTO>;

    /** AppRole，角色 */
    interface AppRole {
      /** 创建人 */
      createBy?: string;
      /** 创建时间 */
      createTime?: string;
      /** 角色介绍 */
      description: string;
      /** 名称 */
      displayName: string;
      /** 状态 */
      enabled: boolean | null;
      /** 主键id */
      id: number;
      /** 角色 */
      name: string;
      /** 角色权限 */
      permissions: string[];
      /** 更新人 */
      updateBy?: string;
      /** 更新时间 */
      updateTime?: string;
    }
    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<SystemManage.AppRole, 'name' | 'displayName' | 'enabled'> & CommonSearchParams
    >;

    /** role list */
    type RoleList = Api.Common.PaginatingQueryRecord<AppRole>;

    /** all role */
    type AllRole = Pick<AppRole, 'id' | 'name' | 'displayName'>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type Menu = Api.Common.CommonRecord<{
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /**
       * i18n key
       *
       * it is for internationalization
       */
      i18nKey?: App.I18n.I18nKey;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** menu order */
      order: number;
      /** whether to cache the route */
      keepAlive?: boolean;
      /** outer link */
      href?: string;
      /** whether to hide the route in the menu */
      hideInMenu?: boolean;
      /**
       * The menu key will be activated when entering the route
       *
       * The route is not in the menu
       *
       * @example
       *   the route is "user_detail", if it is set to "user_list", the menu "user_list" will be activated
       */
      activeMenu?: import('@elegant-router/types').LastLevelRouteKey;
      /** By default, the same route path will use one tab, if set to true, it will use multiple tabs */
      multiTab?: boolean;
      /** If set, the route will be fixed in tabs, and the value is the order of fixed tabs */
      fixedIndexInTab?: number;
      /** menu buttons */
      buttons?: MenuButton[];
      /** children menu */
      children?: Menu[];
    }>;

    /** menu list */
    type MenuList = Api.Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };
  }
}
