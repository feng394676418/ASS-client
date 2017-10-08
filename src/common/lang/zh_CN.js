import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

export default {
    order: {
        searchplaceholder: '请输入工单号/运单号...',
        NewWorkOrder: '新建工单',
        EditWorkOrder: '编辑工单',
        orderList: '工单列表',
        refNumber: '工单编号',
        userName: '客户姓名',
        userInfo: '客户信息',
        trackingNo: '寄运单号',
        productType: '产品型号',
        imei: 'IMEI号码',
        facilitatorName: '服务商',
        owner: '厂商',
        status: '工单状态',
        createDate: '创建时间',
        operation: '操作',
        daterange: '请选择日期范围',
        serviceprovider: '请选择服务商',
        selectowner: '请选择厂商',
        selectOrderInfo: '请选择工单信息',
        tel: '电话',
        mail: '邮箱',
        country: '国家',
        choose: '请选择',
        province: '州/省',
        city: '城市',
        zipcode: '邮编',
        address: '详细地址',
        Alternativecontact: '相关联系人',
        Alternativecontacttel: '相关联系人电话',
        AWBNo: '寄送运单号',
        Courier: '快递公司',
        Purchasedate: '购买日期',
        Color: '颜色',
        Accessories: '配件',
        Otheraccessories: '其它配件',
        Giftbox: '包装盒',
        USBcable: '数据线',
        Poweradaptor: '适配器',
        Appearance: '外观情况',
        Appearancedescription: '外观详细描述',
        Failuredescription: '客户故障描述',
        Serviceprovideraddress: '服务商地址',
        Serviceprovidertel: '服务商联系电话',
        Cancel: '取 消',
        Affirm: '确 认',
        statusItems: [
            { name: '全部', value: '0', status: '-1' },
            { name: '待受理', value: '0', status: '11' },
            { name: '待检测', value: '0', status: '12' },
            { name: '待确认', value: '0', status: '13' },
            { name: '待维修', value: '0', status: '14' },
            { name: '待质检', value: '0', status: '15' },
            { name: '待结算', value: '0', status: '16' },
            { name: '待发货', value: '0', status: '17' },
            { name: '待收货', value: '0', status: '18' },
            { name: '已完结', value: '0', status: '19' }
        ],
        logStatusNameArray: [
            { name: '新建工单', status: 11 },
            { name: '编辑工单', status: 1 },
            { name: '受理', status: 12 },
            { name: '检测', status: 13 },
            { name: '确认报价', status: 14 },
            { name: '维修', status: 15 },
            { name: '质检', status: 16 },
            { name: '结算', status: 17 },
            { name: '发货', status: 18 },
            { name: '已完结', status: 19 }
        ],
        appearanceOptions: [
            { value: '外观完好' },
            { value: '外观破损' }
        ],
        // 工单详情页
        Detail: {
            partActuralUseTitle: '实际维修用备件信息',
            workordernumber: '输入工单编号...',
            productinformation: '产品信息',
            Serviceproviderinfo: '服务商信息',
            Producttesting: '产品检测',
            Physicalmodel: '实物机型',
            Match: '实物与产品信息匹配',
            Mismatch: '实物与产品信息不匹配',
            PhysicalIMEI: '实物IMEI',
            Servicetype: '服务类型判定',
            RepairLevel: '维修等级确认',
            IdentifiedFailure: '故障原因',
            SKU: '备件编码',
            Sparepartsname: '备件名称',
            Quantity: '数量',
            Price: '价格',
            Inboundshippingcost: '收件运费',
            OutboundShippingCost: '寄件运费',
            Servicecost: '服务费',
            Total: '总计',
            QCreport: '产品质检',
            QCFail: '不合格',
            malfunction: '故障',
            FullFunctionReport: '全功能检测',
            TransactionNo: '交易流水号',
            QCPass: '合格',
            solved: '已解决',
            unsolved: '未解决',
            Payment: '结算',
            ShipmentInfo: '发货信息',
            Courier: '发货渠道',
            AWBNo: '运单号',
            RecipientAddress: '收件人地址',
            ProcessedWorkOrder: '受理工单',
            Accepted: '受理',
            Note: '备注',
            Normal: '外观完好',
            Abnormal: '外观破损',
            Acceptsfailed: '受理失败!异常信息',
            Acceptedsuccessfully: '受理成功',
            settlementover: '结算完了!',
            Billingupdatefailed: '结算更新失败',
            Examing: '检测报告',
            Examingfinish: '检测完成',
            Productmodelconfirmation: '产品型号确认',
            IMEInumberconfirmation: 'IMEI号码确认',
            Causeoffailure: '故障原因确认',
            addtext: '上传照片大小不得超过5Mb，支持JPEG、PNG、GIF。最多上传五张。',
            Sparepartsrequesttable: '备件需求表',
            Enterthesparepartcode: '输入备件编码/名称',
            Sparepartscodename: '备件编码/名称',
            Totaloffer: '总报价',
            Confirmtheoffer: '确认报价',
            Quotationdescription: '您已经查看了工单检测单的报价明细，确认接受报价吗？',
            Repair: '维修',
            usingspareparts: '实际维修使用备件',
            Confirmtherepair: '您确认已经完成工单维修吗？',
            Shipping: '发货',
            Sendername: '发件人姓名',
            received: '已收货',
            Confirmreceipt: '确认客户已收货',
            Confirmreceiptdescription: '确认已经收货，工单完结？',
            QC: '质检',
            Inspectionreport: '质检报告',
            IssuesSolved: '故障是否解决',
            Fullfunctiontestresults: '全功能检测结果',
            yes: '是',
            no: '否',
            qualityResult: '质检完了',
            receiptFinished: '收货处理完了',
            Inwarranty: '保内维修',
            Outwarranty: '保外维修',
            Canuploadimages: '最多只能上传5张图片!',
            imagesformatincorrect: '上传图片格式不正确!',
            Maximumimage: '上传图片大小不能超过 5MB!',
            worryaboutyourIQ: '备件编码/名称不能为空且数量大于1!',
            Accessoriesadded: '该备件已存在，如需修改数量请删除重填',
            Quoteconfirmedfinished: '报价确认完了!',
            Quoteconfirmationfailed: '报价确认失败!',
            updatesuccess: '维修完成更新成功',
            updatefailed: '维修完成更新失败',
            enterworkorderno: '请先输入工单编号!',
            notallowedtoedit: '工单已受理，不允许编辑！',
            China: '中国',
            Guangdong: '广东',
            Shenzhen: '深圳',
            Deliveryfinished: '发货处理完了！',
            Exceptional: '异常发生：',
            Getexception: '物流渠道获取异常:',
            ShippingExpressCode: '请选择物流渠道!',
            Accessories: '配件情况',
            downloadWaybill: '下载运单',
            establishmentworkorder: '建立工单,工单待受理。',
            workorderaccepted: '编辑工单,工单待受理。',
            workordertested: '受理工单,工单待检测。',
            Workorderconfirmed: '完成检测,工单待确认报价。',
            workorderrepaired: '确认报价,工单待维修。',
            Workorderqualityinspection: '完成维修,工单待质检。',
            workordersettled: '完成质检,质检合格,工单待结算。',
            workorderdelivered: '完成质检,质检合格,工单待发货。',
            workordershipped: '完成结算,工单待发货。',
            workorderreceived: '完成发货,工单待收货。',
            endworkorder: '货况显示已收货,工单完结。',
            TransactionNoNOTNULL: '交易流水号不能为空!'
        },
        modalNotInput: '产品型号必须填写!',
        imeiNoNotInput: '产品IMEI必须填写!',
        toDo_tasks: '待处理工单',
        noData: '暂无数据'
    },
    export: '导出',
    BACK: '返回列表',
    Add: '添加',
    exception: '发生异常',
    MSG_OK: '操作成功！',
    MSG_NG: '操作失败！',
    Unreadmessage: '未读消息',
    Personalinfo: '个人信息',
    Changepassword: '修改密码',
    Logout: '退出系统',
    Chinese: '简体中文',
    WingsingASS: '荣昇售后管理系统',
    password: '密码',
    Login: '登录',
    Forgotpassword: '忘记密码（或首次登录）',
    legalemail: '请输入正确的合法邮箱',
    passworddigits: '密码不能少于6位',
    all: '全部',
    // 备件
    part: {
        Sparepartslist: '备件列表',
        Newspareparts: '新建备件',
        Modifyspareparts: '修改备件',
        Effective: '生效',
        Failure: '失效',
        coding: '编码',
        weight: '重量',
        Tagcode: '标签编码',
        owner: '厂商',
        price: '保内价格',
        outPrice: '保外价格',
        unit: '单位',
        suitModel: '适用机型',
        description: '描述',
        chooseaccessoryinfo: '请选择一条配件信息！',
        selectaccessoriesinfo: '请选择配件信息！',
        entershipper: '请输入编码/名称...',
        Sparepartsform: '备件申请单',
        Auditresults: '审核结果',
        selectaccessories: '请选择配件!',
        partsapplicationsuccessful: '备件申请成功!',
        partcannotbeempty: '备件编码不能为空!',
        partshavebeenadd: '该备件已追加,请修改数量!',
        Newpartsapplication: '新建备件申请',
        entersparepartcode: '请输入备件编码',
        Serviceproviderinventory: '服务商现有库存',
        statusNameOptions: [{ status: 11, name: '待审核' }, { status: 12, name: '待发货' }, { status: 13, name: '待收货' }, { status: 14, name: '已完结' }, { status: 1, name: '已完结' }],
        passOptions: [{ status: '11', name: '不通过' }, { status: '1', name: '不通过' }, { status: '12', name: '通过' }, { status: '13', name: '通过' }, { status: '14', name: '通过' }],
        statusENOptions: [{ status: '0', name: '生效' }, { status: '1', name: '失效' }],
        logStatusArray: [{ status: 11, name: '新建' }, { status: 12, name: '审核' }, { status: 13, name: '发货' }, { status: 14, name: '已完结' }, { status: 1, name: '审核不通过' }],
        Sparepartsappform: '备件申请表',
        Numberofapplications: '申请数量',
        Serviceproexistinginventory: '服务商现有库存',
        Deliverywarehouse: '发货仓库',
        Review: '审核',
        pass: '通过',
        Fail: '不通过',
        reason: '原因',
        orderpendingreview: '新建订单，订单待审核。',
        approvedpendingshipment: '审核通过，订单待发货。',
        shippedpendingreceival: '已发货，订单待收货。',
        receivedorderfinished: '已收货，订单完结。',
        Unapprovedorderclosed: '审核不通过，订单完结。',
        Communicationabnormality: '通信异常!',
        Confirmdelivery: '确认发货?',
        Confirmreceipt: '确认收货?',
        Receipt: '收货',
        Receiptisfinished: '收货处理完了!',
        countPart: '清点库存',
        countPartMsgOK: '清点库存成功！',
        countPartMsgNG: '清点库存失败！',
        addPartOK: '新增备件成功！',
        addPartNG: '新增备件失败！',
        editPartOK: '修改备件成功！',
        editPartNG: '修改备件失败！',
        isExistPart: '备件编码已存在！',
        import: '导入',
        importParts: '备件导入',
        importExplain: '请按照导入模板的格式填写数据',
        templatesDownload: '模板下载',
        matters: '注意事项',
        mattersNo1: '所有字段为必填',
        mattersNo2: '保内价格、保外价格、重量请设置成文本格式'
    },
    // 仓库
    Warehouse: {
        enterwarehousecode: '请输入仓库代码/英文名称/中文名称...',
        WarehouseList: '仓库列表',
        NewWarehouse: '新建仓库',
        Modifythewarehouse: '修改仓库',
        Enabled: '启用',
        Disabled: '禁用',
        Warehousecode: '仓库代码',
        WarehouseShortCode: '仓库简码',
        Englishname: '英文名称',
        Chinesename: '中文名称',
        Shipper: '货主',
        status: '状态',
        Modifypeople: '修改人',
        Changethetime: '修改时间',
        Overallintroduction: '整体介绍',
        SystemCODE: '系统CODE',
        selectshipper: '请选择货主',
        awarehouseinformation: '请选择一条仓库信息！',
        warehouseinformation: '请选择仓库信息！',
        statusOptions: [{ status: '0', name: '启用' }, { status: '1', name: '禁用' }]
    },
    inventory: {
        title: '库存列表',
        owner: '厂商',
        inventoryType: '好/坏料',
        sku: '备件编码(SKU)',
        name: '备件名称',
        unit: '单位',
        qty: '数量',
        checkTime: '清点时间',
        ViewSerial: '查看流水',
        change: {
            inventoryChangeTitle: '库存流水',
            createDate: '出入库时间',
            sku: '备件编码(SKU)',
            cnName: '备件名称',
            orderNumber: '订单编号',
            changeType: '单据类型',
            qty: '出入库数量',
            oldQty: '原库存',
            newQty: '新库存'
        }
    },
    stockOrder: {
        searchplaceholder: '输入订单编号',
        title: '备件出入库单',
        odrNumber: '订单编号',
        owner: '厂商',
        productType: '好/坏料',
        orderType: '单据类型',
        inOutType: '出入库类别',
        shippingFrom: '发货机构',
        shippingTo: '收货机构',
        createDate: '创建时间',
        createUserName: '创建人员',
        viewDetail: '详情',
        productTypeOptions: [{ label: '好料', value: 0 }, { label: '坏料', value: 1 }],
        inOutTypeOptions: [{ label: '备件申请', value: '10' }, { label: '坏件返厂', value: '20' }, { label: '厂商调拨', value: '30' }],
        orderTypeOptions: [{ name: 'inbound' }, { name: 'outbound' }],
        detail: {
            inventoryDetails: '出入库明细',
            serialNo: '序号',
            sku: '备件编码(SKU)',
            name: '备件名称',
            unit: '单位',
            qty: '数量'
        }
    },
    phonemodel: {
        entermodelcode: '请输入机型编码/英文名称/中文名称...',
        modelList: '机型列表',
        newmodel: '新建机型',
        modifymodel: '修改机型',
        effect: '生效',
        invalid: '失效',
        modelcode: '机型编码',
        shipper: '货主',
        chinesename: '中文名称',
        englishname: '英文名称',
        status: '状态',
        remark: '备注',
        modifypeople: '修改人',
        changethetime: '修改时间',
        amodelinfo: '请选择一条机型信息！',
        modelinfo: '请选择机型信息！',
        statusOptions: [{ status: '0', name: '有效' }, { status: '1', name: '无效' }],
        newaddsuc: '新增机型成功!',
        newaddfai: '新增机型失败!',
        repeatnewadd: '新增失败、机型编码重复!',
        neweditsuc: '编辑成功!',
        neweditfai: '编辑失败!'
    },
    insufficientStock: '库存不足!',
    noStockInfo: '没有库存信息!',
    ...zhLocale
}