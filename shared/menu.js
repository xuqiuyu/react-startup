/**
 * 定义sidebar中的菜单项
 *
 * 一些约定:
 * 1.菜单最多3层;
 * 2.只有顶层的菜单可以带图标;
 * 3.只有"叶子"节点才能跳转;
 * 4.所有的key都不能重复;
 */

const menus = [{
  key: 'index',
  name: '首页',
  icon: 'home'
}, {
  key: 'tools', // route时url中的值
  name: '工具', // 在菜单中显示的名称
  icon: 'tool', // 只有顶层菜单可以带图标
  child: [{
    key: 'mybatisGenerator',
    name: 'MyBatis Generator'
  }, {
    key: 'clearCache',
    name: '刷新缓存'
  }, {
    key: 'dataQuery',
    name: '数据查询'
  }, {
    key: 'operationLog',
    name: '操作日志'
  }, {
    key: 'publishMessage',
    name: '发布消息'
  }]
}, {
  key: 'auth', // route时url中的值
  name: '权限管理', // 在菜单中显示的名称
  icon: 'key', // 只有顶层菜单可以带图标
  child: [{
    key: 'resource',
    name: '资源'
  }, {
    key: 'role',
    name: '角色'
  }, {
    key: 'user',
    name: '用户'
  }]
}, {
  key: 'commonGw', // route时url中的值
  name: '通用网关', // 在菜单中显示的名称
  icon: 'retweet', // 只有顶层菜单可以带图标
  child: [{
    key: 'commonGwRoutConfig',
    name: '通用网关路由配置'
  }]
}, {
  key: 'dataSyncModule',
  name: '数据同步',
  icon: 'sync',
  child: [{
    key: 'dataSyncModuleConfig',
    name: '同步模块配置'
  }, {
    key: 'dataSyncAssignment',
    name: '同步任务'
  }]
}, {
  key: 'scheduledTask',
  name: '定时任务',
  icon: 'clock-circle-o',
  child: [{
    key: 'taskMngr',
    name: '任务管理'
  }, {
    key: 'jobConfig',
    name: '作业配置'
  }]
}, {
  key: 'msfPoint', // route时url中的值
  name: '马上飞积分', // 在菜单中显示的名称
  icon: 'pay-circle-o', // 只有顶层菜单可以带图标
  child: [{
    key: 'pointInitConfig',
    name: '首次赠送积分策略'
  }, {
    key: 'pointGivenStrategy',
    name: '产品赠送积分策略'
  }, {
    key: 'report',
    name: '报表'
  }, {
    key: 'queryTools',
    name: '查询工具'
  }]
}, {
  key: 'userManagement', // route时url中的值
  name: '用户管理', // 在菜单中显示的名称
  icon: 'user', // 只有顶层菜单可以带图标
  child: [{
    key: 'salesChannelUserInfo',
    name: '渠道用户'
  }, {
    key: 'salesUserChannelRelation',
    name: '渠道用户身份信息'
  }, {
    key: 'userUnbundle',
    name: '渠道用户身份信息解绑'
  }, {
    key: 'salesUserRealNameAuth',
    name: '渠道用户实名认证'
  }, {
    key: 'salesUser',
    name: '用户证件'
  }, {
    key: 'salesUserPhone',
    name: '渠道用户联系电话'
  }, {
    key: 'salesUserInfo',
    name: '用户自然信息'
  }, {
    key: 'salesUserAccount',
    name: '用户银行账户'
  }, {
    key: 'salesUserAddress',
    name: '用户收货地址信息'
  }]
}, {
  key: 'msfMonitoring', // route时url中的值
  name: '马上飞监控', // 在菜单中显示的名称
  icon: 'line-chart', // 只有顶层菜单可以带图标
  child: [{
    key: 'msfReport',
    name: '效果监控'
  }, {
    key: 'pvuv',
    name: '埋点监控'
  }, {
    key: 'pagePvuv',
    name: '页面监控'
  }, {
    key: 'kwUsage',
    name: '关键字使用监控'
  }, {
    key: 'qrUsage',
    name: '二维码使用监控'
  }]
}, {
  key: 'msfActivity', // route时url中的值
  name: '马上飞活动管理', // 在菜单中显示的名称
  icon: 'rocket', // 只有顶层菜单可以带图标
  child: [{
    key: 'giftDefinition',
    name: '礼品管理'
  }, {
    key: 'giftTypeDefinition',
    name: '礼品类型管理'
  }, {
    key: 'activityGiftStrategy',
    name: '发放数量管理'
  }, {
    key: 'activityGiftProbability',
    name: '发放概率管理'
  }, {
    key: 'couponDefinition',
    name: '优惠券管理'
  }, {
    key: 'couponRelease',
    name: '优惠券发放'
  }, {
    key: 'couponReleaseStrategy',
    name: '优惠券发放策略'
  }, {
    key: 'couponManualOperation',
    name: '优惠券变更'
  }, {
    key: 'activity',
    name: '活动管理'
  }, {
    key: 'shareFollowDiscussTotality',
    name: '分享流程评论总数'
  }, {
    key: 'shareFollowRecord',
    name: '分享流程记录'
  }, {
    key: 'kefuWorkday',
    name: '客户服务时间'
  }, {
    key: 'couponPackageDefinition',
    name: '礼包管理'
  }, {
    key: 'receiveRecord',
    name: '领取记录'
  }]
}, {
  key: 'claimQuery',
  name: '出险记录查询',
  icon: 'select',
  child: [{
    key: 'dongHangClaimQuery',
    name: '出险记录查询'
  }, {
    key: 'yiLongClaimQuery',
    name: '报案申请记录查询'
  }]
}, {
  key: 'product',
  name: '产品配置',
  icon: 'link',
  child: [{
    key: 'channelProductConfig',
    name: '渠道产品配置'
  }, {
    key: 'channelProductBigscreenConfig',
    name: '渠道产品大屏配置'
  }, {
    key: 'channelProductBigscreenConfigUploadXLSX',
    name: '渠道产品大屏配置上传'
  }, {
    key: 'dictConfig',
    name: '渠道字典表配置'
  }, {
    key: 'productUwError',
    name: '产品核保错误代码'
  }, {
    key: 'userAntiFraud',
    name: '用户反欺诈'
  }]
}, {
  key: 'calculation',
  name: '计算引擎',
  icon: 'calculator',
  child: [{
    key: 'premiumCalculationFactor',
    name: '计算因子配置'
  }, {
    key: 'premiumCalculationOnlyRule',
    name: '计算规则单独配置'
  }, {
    key: 'premiumCalculationRuleDesc',
    name: '计算规则描述配置'
  }, {
    key: 'premiumCalculationRule',
    name: '计算规则配置'
  }, {
    key: 'premiumCalculationRefresh',
    name: '计算规则缓存'
  }, {
    key: 'premiumCalculationUpload',
    name: '计算规则上传'
  }]
}, {
  key: 'tourContentManagement',
  name: '旅游内容管理',
  icon: 'global',
  child: [{
    key: 'tourContentConfig',
    name: '旅游内容配置'
  }, {
    key: 'wechatNewsMaterialQuery',
    name: '微信文章素材查询'
  }]
}, {
  key: 'autoClaimSettle',
  name: '自动理赔',
  icon: 'customer-service',
  child: [{
    key: 'claimSubmit',
    name: '提交报案'
  }, {
    key: 'claimTempStorage',
    name: '未完成记录查询'
  }]
}, {
  key: 'tempDataMatch',
  name: '模板数据配置',
  icon: 'file-add',
  child: [{
    key: 'lotteryLucky',
    name: '翻牌抽奖活动'
  }, {
    key: 'callFriends',
    name: '呼朋引伴领取红包活动'
  }, {
    key: 'welcome',
    name: '迎新活动'
  }]
}, {
  key: 'orderCenter', // route时url中的值
  name: '订单中心', // 在菜单中显示的名称
  icon: 'switcher', // 只有顶层菜单可以带图标
  child: [{
    key: 'groupOrder',
    name: '团单'
  }, {
    key: 'order',
    name: '订单'
  }, {
    key: 'orderDetail',
    name: '订单明细'
  }, {
    key: 'orderDetailRepair',
    name: '订单明细数据修复'
  }, {
    key: 'claimEvent',
    name: '用户理赔事件'
  }, {
    key: 'orderRefund',
    name: '订单退款'
  }, {
    key: 'delayRedPacketDetail',
    name: '航延随机红包'
  }]
}, {
  key: 'ticketCenter', // route时url中的值
  name: '马上飞-券码兑换', // 在菜单中显示的名称
  icon: 'retweet', // 只有顶层菜单可以带图标
  child: [{
    key: 'ticket',
    name: '券码管理'
  }]
}, {
  key: 'aliOss',
  name: '阿里OSS',
  icon: 'setting',
  child: [{
    key: 'imgUpload',
    name: '图片上传'
  }]
}, {
  key: 'communityCenter',
  name: '社区管理',
  icon: 'book',
  child: [{
    key: 'airUnion',
    name: '航空联盟'
  }, {
    key: 'airline',
    name: '航空公司'
  }, {
    key: 'airlineBerthDefine',
    name: '航空公司舱位定义'
  }, {
    key: 'airlineBerthGroup',
    name: '航空公司舱位分组'
  }, {
    key: 'contentDescriptionRelation',
    name: '文本描述对应关系'
  }, {
    key: 'contentInfo',
    name: '文本信息'
  }, {
    key: 'frequentFlyerPlan',
    name: '常旅客计划'
  }, {
    key: 'legMileage',
    name: '航段里程'
  }, {
    key: 'planAirRelation',
    name: '常旅客计划对应航空公司或联盟关系'
  }, {
    key: 'planCardInfo',
    name: '常旅客计划卡种'
  }, {
    key: 'planCardRight',
    name: '常旅客计划卡种权益'
  }, {
    key: 'planFormulaConfig',
    name: '常旅客计划公式配置'
  }, {
    key: 'adConfig',
    name: '广告配置'
  }, {
    key: 'favourActivity',
    name: '优惠活动'
  }]
}, {
  key: 'apiDocGenerator',
  name: 'api文档管理',
  icon: 'setting',
  child: [{
    key: 'docManagement',
    name: '文档管理'
  }, {
    key: 'apiDocGroup',
    name: '文档分组信息管理'
  }, {
    key: 'apiDocProject',
    name: '文档项目管理'
  }, {
    key: 'apiDocDomain',
    name: '文档域名地址信息管理'
  }, {
    key: 'apiDocInterface',
    name: '文档接口管理'
  }]
}, {
  key: 'gardenBox',
  name: '公园盒子',
  icon: 'setting',
  child: [{
    key: 'orderSum',
    name: '订单量查询'
  }, {
    key: 'orderDetail',
    name: '订单明细查询'
  }]
}, {
  key: 'autoPricing',
  name: '航旅自动定价系统',
  icon: 'book',
  child: [{
    key: 'dynamicDetailQuery',
    name: '动态航延明细查询'
  }]
}, {
  key: 'domineering',
  name: '霸气',
  icon: 'heart',
  child: [{
    key: 'overlordDomineering',
    name: '霸王色霸气'
  }]
}];

export default menus;

