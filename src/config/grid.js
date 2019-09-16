const ManagementGrid = {
  list: [
    {
      name: '店铺管理',
      path: '/management/storefront',
      enable: require('../assets/image/dpgl.png'),
      disable: require('../assets/image/dpgl_gray.png'),
    },
    {
      name: '商品管理',
      path: '/management/commodity',
      enable: require('../assets/image/spgl.png'),
      disable: require('../assets/image/spgl_gray.png'),
    },
    {
      name: '店员管理',
      path: '/management/shopManager',
      enable: require('../assets/image/dygl.png'),
      disable: require('../assets/image/dygl_gray.png'),
    },
    {
      name: '会员管理',
      path: '/management/member',
      enable: require('../assets/image/hygl.png'),
      disable: require('../assets/image/hygl_gray.png'),
    },
  ],
}

const PopularizeGrid = {
  title: '商家推广',
  list: [
    {
      name: '图文管理',
      path: '1',
      enable: require('../assets/image/twgl.png'),
      disable: require('../assets/image/twgl_gray.png'),
    },
    {
      name: '礼品管理',
      path: '/popularize/giftManagement',
      enable: require('../assets/image/lpgl.png'),
      disable: require('../assets/image/lpgl_gray.png'),
    },
    {
      name: '奖品管理',
      path: '3',
      enable: require('../assets/image/jpgl.png'),
      disable: require('../assets/image/jpgl_gray.png'),
    },
    {
      name: '全民分销',
      path: '4',
      enable: require('../assets/image/qmfx.png'),
      disable: require('../assets/image/qmfx_gray.png'),
    },
    // {
    //   name: '红包推广',
    //   path: '/popularize/redEnvelope',
    //   enable: require('../assets/image/hbtg.png'),
    //   disable: require('../assets/image/hbtg_gray.png'),
    // },
    {
      name: '智能屏推广',
      path: '6',
      enable: require('../assets/image/znptg.png'),
      disable: require('../assets/image/znptg_gray.png'),
    },
    {
      name: '渠道推广码',
      path: '7',
      enable: require('../assets/image/qdewm.png'),
      disable: require('../assets/image/qdewm_gray.png'),
    },
    {
      name: '店员推广',
      path: '/popularize/shopAssistant',
      enable: require('../assets/image/dytg.png'),
      disable: require('../assets/image/dytg_gray.png'),
    },
  ],
}

const AllianceGrid = {
  title: '异业联盟',
  list: [
    {
      name: '联盟活动',
      path: 'http://cs.7youke.com/wap.php?g=Wap&c=Wapactivity&a=activity_list',
      enable: require('../assets/image/lmhd.png'),
      disable: require('../assets/image/lmhd_gray.png'),
    },
    {
      name: '金币抵现',
      path: '2',
      enable: require('../assets/image/jbsc.png'),
      disable: require('../assets/image/jbsc_gray.png'),
    },
    {
      name: '悬赏佣金',
      path: '3',
      enable: require('../assets/image/xsyj.png'),
      disable: require('../assets/image/xsyj_gray.png'),
    },
    {
      name: '广告设置',
      path: '4',
      enable: require('../assets/image/ggsz.png'),
      disable: require('../assets/image/ggsz_gray.png'),
    },
  ],
}

const SettingGrid = {
  title: '商家设置',
  list: [
    {
      name: '基本信息',
      path: '/setting/basicInformation',
      enable: require('../assets/image/jbxx.png'),
      disable: require('../assets/image/jbxx_gray.png'),
    },
    {
      name: '功能权限',
      path: '2',
      enable: require('../assets/image/gnqx.png'),
      disable: require('../assets/image/gnqx_gray.png'),
    },
    {
      name: '运费设置',
      path: '3',
      enable: require('../assets/image/yfsz.png'),
      disable: require('../assets/image/yfsz_gray.png'),
    },
    {
      name: '配送管理',
      path: '4',
      enable: require('../assets/image/psgl.png'),
      disable: require('../assets/image/psgl_gray.png'),
    },
    {
      name: '自提点管理',
      path: '5',
      enable: require('../assets/image/ztdgl.png'),
      disable: require('../assets/image/ztdgl_gray.png'),
    },
    {
      name: '自有支付',
      path: '6',
      enable: require('../assets/image/zyzf.png'),
      disable: require('../assets/image/zyzf_gray.png'),
    },
    {
      name: '供应商管理',
      path: '7',
      enable: require('../assets/image/gysgl.png'),
      disable: require('../assets/image/gysgl_gray.png'),
    },
    {
      name: '设备管理',
      path: '8',
      enable: require('../assets/image/sbgl.png'),
      disable: require('../assets/image/sbgl_gray.png'),
    },
  ],
}

const BusinessGrid = {
  title: '商家业务',
  list: [
    {
      name: '电商管理',
      path: '1',
      enable: require('../assets/image/dsgl.png'),
      disable: require('../assets/image/dsgl_gray.png'),
    },
    {
      name: '外卖管理',
      path: '2',
      enable: require('../assets/image/wmgl.png'),
      disable: require('../assets/image/wmgl_gray.png'),
    },
    {
      name: '餐饮管理',
      path: '3',
      enable: require('../assets/image/cygl.png'),
      disable: require('../assets/image/cygl_gray.png'),
    },
    {
      name: '酒店管理',
      path: '4',
      enable: require('../assets/image/jdgl.png'),
      disable: require('../assets/image/jdgl_gray.png'),
    },
    {
      name: '预约管理',
      path: '5',
      enable: require('../assets/image/yygl.png'),
      disable: require('../assets/image/yygl_gray.png'),
    },
    {
      name: '团购管理',
      path: '6',
      enable: require('../assets/image/tggl.png'),
      disable: require('../assets/image/tggl_gray.png'),
    },
    {
      name: '批发供货',
      path: '7',
      enable: require('../assets/image/pfgh.png'),
      disable: require('../assets/image/pfgh_gray.png'),
    },
    {
      name: '汽配管理',
      path: '8',
      enable: require('../assets/image/qpgl.png'),
      disable: require('../assets/image/qpgl_gray.png'),
    },
  ],
}

const BillGrid = {
  title: '商家账单',
  list: [
    {
      name: '商家对账',
      path: '1',
      enable: require('../assets/image/sjdz.png'),
      disable: require('../assets/image/sjdz_gray.png'),
    },
    {
      name: '店员对账',
      path: '2',
      enable: require('../assets/image/dydz.png'),
      disable: require('../assets/image/dydz_gray.png'),
    },
    {
      name: '店铺对账',
      path: '3',
      enable: require('../assets/image/dpdz.png'),
      disable: require('../assets/image/dpdz_gray.png'),
    },
    {
      name: '经营统计',
      path: '4',
      enable: require('../assets/image/jytj.png'),
      disable: require('../assets/image/jytj_gray.png'),
    },
  ],
}

const ListData = [
  {
    title: '汽车服务',
    path: '1',
    enable: true,
    hasIcon: true,
  },
  {
    title: '餐饮美食',
    path: '2',
    enable: true,
    hasIcon: true,
  },
  {
    title: '教育培训',
    path: '1',
    enable: true,
    hasIcon: true,
  },
  {
    title: '酒店旅游',
    path: '1',
    enable: false,
    hasIcon: false,
  },
  {
    title: '休闲娱乐',
    path: '1',
    enable: true,
    hasIcon: false,
  },
  {
    title: '其他行业',
    path: '1',
    enable: false,
    hasIcon: true,
  },
]

export {
  ManagementGrid,
  PopularizeGrid,
  AllianceGrid,
  SettingGrid,
  BusinessGrid,
  BillGrid,
  ListData,
}
