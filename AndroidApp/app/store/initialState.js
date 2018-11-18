module.exports = {
    people: [
      {
        id: 'fe990918-87f0-4c23-84b4-b168ab0283c5',
        firstName: 'Алексей',
        lastName: 'Зуев',
        sex: 'Male',
		lastModificationTime: '2018-10-09T12:20:00.000Z',
		creationTime: '2018-10-09T12:20:00.000Z',
        isDeleted:'false'
      },
      {
        id: '89d2214a-a4da-4bd5-8651-fbb4f6d9ba8a',
        firstName: 'Наталья',
        lastName: 'Зуева',
        sex: 'Male',
		lastModificationTime: '2018-10-09T12:20:00.000Z',
        creationTime: '2018-10-09T12:20:00.000Z',
        isDeleted:'false'
      },
      {
        id: 'c22797c0-ba8d-41d7-b1ae-191865a3b00d',
        firstName: 'Надежда',
        lastName: 'Зуева',
        sex: 'Male',
		lastModificationTime: '2018-10-09T12:20:00.000Z',
        creationTime: '2018-10-09T12:20:00.000Z',
        isDeleted:'false'
      }
    ],
    moneyCells: [
      {
        id: '0c8529da-08c7-41db-b723-005de47985a1',
        ownerId: 'fe990918-87f0-4c23-84b4-b168ab0283c5',
        moneyCellType: 'Cash',
        amount: 1500,
        startDate: null,
        endDate: null,
        name: 'Кошелек',
        status: 'Active',
        parentId: null,
        isValid: true,
        roi: null,
		lastModificationTime: '2018-10-09T12:20:00.000Z',
        creationTime: '2018-10-09T12:20:00.000Z',
        isDeleted:'false'
      },
      {
        id: 'b3bcb0c7-caa9-4105-9c52-22b83de3312f',
        ownerId: 'fe990918-87f0-4c23-84b4-b168ab0283c5',
        moneyCellType: 'Card',
        amount: 20000,
        startDate: '2018-04-23T21:00:00.000Z',
        endDate: '2021-04-23T21:00:00.000Z',
        name: 'Карта Сбербанк (з/п)',
        status: 'Active',
        parentId: null,
        isValid: true,
        roi: null,
		lastModificationTime: '2018-10-09T12:20:00.000Z',
        creationTime: '2018-10-09T12:20:00.000Z',
        isDeleted:'false'
      },
      {
        id: '08d886eb-fd07-47e5-b8d4-491af5d98ef7',
        ownerId: 'fe990918-87f0-4c23-84b4-b168ab0283c5',
        moneyCellType: 'Deposit',
        amount: 800000,
        startDate: '2018-09-09T21:00:00.000Z',
        endDate: '2018-10-09T21:00:00.000Z',
        name: 'Вклад банк восточный',
        status: 'Active',
        parentId: null,
        isValid: true,
        roi: null,
		lastModificationTime: '2018-10-09T12:20:00.000Z',
        creationTime: '2018-10-09T12:20:00.000Z',
        isDeleted:'false'
      },
      {
        id: 'a2323767-0ccc-4dcb-85ca-539bbeb03425',
        ownerId: '89d2214a-a4da-4bd5-8651-fbb4f6d9ba8a',
        moneyCellType: 'Deposit',
        amount: 140000,
        startDate: '2018-09-13T21:00:00.000Z',
        endDate: '2018-11-13T21:00:00.000Z',
        name: 'Вклад сбербанк',
        status: 'Active',
        parentId: null,
        isValid: true,
        roi: null,
		lastModificationTime: '2018-10-09T12:20:00.000Z',
        creationTime: '2018-10-09T12:20:00.000Z',
        isDeleted:'false'
      },
      {
        id: '6ae9ee24-b213-4a86-8dff-2b5cf6c6f46b',
        ownerId: '89d2214a-a4da-4bd5-8651-fbb4f6d9ba8a',
        moneyCellType: 'Card',
        amount: 2000,
        startDate: null,
        endDate: null,
        name: 'Карта сбербанк (з/п)',
        status: 'Active',
        parentId: null,
        isValid: true,
        roi: null,
		lastModificationTime: '2018-10-09T12:20:00.000Z',
        creationTime: '2018-10-09T12:20:00.000Z',
        isDeleted:'false'
      },
      {
        id: '8c29c926-8f55-4f97-9531-a4f445200e58',
        ownerId: '89d2214a-a4da-4bd5-8651-fbb4f6d9ba8a',
        moneyCellType: 'Cash',
        amount: 2000,
        startDate: null,
        endDate: null,
        name: 'Наличные',
        status: 'Active',
        parentId: null,
        isValid: true,
        roi: null,
		lastModificationTime: '2018-10-09T12:20:00.000Z',
        creationTime: '2018-10-09T12:20:00.000Z',
        isDeleted:'false'
      }
    ],
    transactions: [{
        id: '1',
        fromId: '0c8529da-08c7-41db-b723-005de47985a1',
        toId: '00000000-0000-0000-0000-000000000001',
        articleId: '101',
        amount: 1300,
        date: '2018-11-01T12:20:00.000Z',
        description: 'Покупка колбасы',
        isValid: true,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    },
    {
        id: '2',
        fromId: '00000000-0000-0000-0000-000000000001',
        toId: '0c8529da-08c7-41db-b723-005de47985a1',
        articleId: '201',
        amount: 30000,
        date: '2018-11-01T12:20:00.000Z',
        description: 'Перечисление з/п',
        isValid: true,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    },
    {
        id: '3',
        fromId: '0c8529da-08c7-41db-b723-005de47985a1',
        toId: '00000000-0000-0000-0000-000000000001',
        articleId: '102',
        amount: 450,
        date: '2018-11-01T12:20:00.000Z',
        description: 'Покупка эспумизана',
        isValid: true,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    },
    {
        id: '4',
        fromId: '00000000-0000-0000-0000-000000000001',
        toId: '0c8529da-08c7-41db-b723-005de47985a1',
        articleId: '202',
        amount: 1450,
        date: '2018-11-01T12:20:00.000Z',
        description: 'Проценты с вклада',
        isValid: true,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    },
    {
        id: '5',
        fromId: '0c8529da-08c7-41db-b723-005de47985a1',
        toId: '6ae9ee24-b213-4a86-8dff-2b5cf6c6f46b',
        articleId: '300',
        amount: 2000,
        date: '2018-11-01T12:20:00.000Z',
        description: 'Перевод Наташке',
        isValid: true,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    },
    {
        id: '6',
        fromId: '00000000-0000-0000-0000-000000000001',
        toId: '0c8529da-08c7-41db-b723-005de47985a1',
        articleId: '202',
        amount: 1450,
        date: '2018-11-01T12:20:00.000Z',
        description: 'Проценты с вклада',
        isValid: true,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    },
    {
        id: '7',
        fromId: '0c8529da-08c7-41db-b723-005de47985a1',
        toId: '6ae9ee24-b213-4a86-8dff-2b5cf6c6f46b',
        articleId: '300',
        amount: 2000,
        date: '2018-11-01T12:20:00.000Z',
        description: 'Перевод Наташке',
        isValid: true,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    }],
    articles: [{
        id: 100,
        name: 'Официальная з/п'
    },{
        id: 101,
        name: 'Неофициальная з/п'
    },{
        id: 102,
        name: 'Проценты по депозитам'
    },{
        id: 199,
        name: 'Прочее'
    },{
        id: 201,
        name: 'Квартплата'
    },{
        id: 202,
        name: 'Продукты'
    },{
        id: 203,
        name: 'Хозяйственные товары'
    },{
        id: 204,
        name: 'Прочее'
    },{
        id: 300,
        name: 'Перевод'
    }],
    systemData: {
        lastSynchronizationTime: '2018-10-09T12:20:00.000Z',
        serverAddress : 'http://192.168.1.60:4698'
    }
};