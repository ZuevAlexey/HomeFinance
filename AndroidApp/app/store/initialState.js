export const initialState = {
    people: [],
    moneyCells: [],
    transactions: [],
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
        lastSynchronizationTime: new Date('2011-10-09T12:20:00.000Z'),
        serverAddress : 'http://192.168.1.43:4698'
    }
};